import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { runStage, getSageReaction, getSummary, STAGES } from './sageApi';
import './App.css';

const MEMORY_KEY = 'sage_memory';

// ── Sage voice via Web Speech API ─────────────────────────────
function sageSpeak(text) {
  if (!window.speechSynthesis) return;
  window.speechSynthesis.cancel();
  const clean = text.replace(/[*#`>_~]/g, '').trim();
  const utterance = new SpeechSynthesisUtterance(clean);
  utterance.rate = 0.92;
  utterance.pitch = 1.05;
  utterance.volume = 1;

  const setVoice = () => {
    const voices = window.speechSynthesis.getVoices();
    const preferred = voices.find(v =>
      v.name.includes('Samantha') ||
      v.name.includes('Karen') ||
      v.name.includes('Moira') ||
      (v.name.includes('Female') && v.lang.startsWith('en')) ||
      (v.lang === 'en-US' && v.name.toLowerCase().includes('female'))
    ) || voices.find(v => v.lang === 'en-US') || voices[0];
    if (preferred) utterance.voice = preferred;
    window.speechSynthesis.speak(utterance);
  };

  if (window.speechSynthesis.getVoices().length > 0) {
    setVoice();
  } else {
    window.speechSynthesis.onvoiceschanged = setVoice;
  }
}

function loadMemory() {
  try {
    const raw = localStorage.getItem(MEMORY_KEY);
    return raw ? JSON.parse(raw) : { sessionCount: 0, pastProblems: [], preferences: { edits: [], approvals: [] } };
  } catch { return { sessionCount: 0, pastProblems: [], preferences: { edits: [], approvals: [] } }; }
}

function saveMemory(memory) {
  try { localStorage.setItem(MEMORY_KEY, JSON.stringify(memory)); } catch {}
}

function SageAvatar({ size = 36 }) {
  return (
    <div className="sage-avatar" style={{ width: size, height: size, fontSize: size * 0.4 }}>S</div>
  );
}

function TypingIndicator() {
  return (
    <div className="message sage-message">
      <SageAvatar />
      <div className="bubble sage-bubble typing">
        <span /><span /><span />
      </div>
    </div>
  );
}

function StageBar({ stages, currentIdx, completedKeys }) {
  return (
    <div className="stage-bar">
      {stages.map((s, i) => {
        const done = completedKeys.includes(s.key);
        const active = i === currentIdx;
        return (
          <div key={s.key} className={`stage-pill ${done ? 'done' : ''} ${active ? 'active' : ''}`}>
            <span className="stage-icon">{s.icon}</span>
            <span className="stage-label">{s.label}</span>
          </div>
        );
      })}
    </div>
  );
}

function ArtifactCard({ stageName, content, onDownload }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <div className="artifact-card">
      <div className="artifact-header" onClick={() => setExpanded(e => !e)}>
        <div className="artifact-title">
          <span className="artifact-icon">📄</span>
          <span>{stageName} artifact</span>
        </div>
        <div className="artifact-actions">
          <button className="icon-btn" onClick={e => { e.stopPropagation(); onDownload(content, stageName); }} title="Download">⬇</button>
          <span className="expand-icon">{expanded ? '▲' : '▼'}</span>
        </div>
      </div>
      {expanded && (
        <div className="artifact-body markdown-body">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </div>
      )}
    </div>
  );
}

function CheckpointCard({ reaction, onApprove, onEdit, onRegenerate, feedback, setFeedback, showFeedback, setShowFeedback }) {
  return (
    <div className="checkpoint-card">
      <div className="checkpoint-header">
        <SageAvatar size={28} />
        <span className="checkpoint-label">Sage checkpoint</span>
      </div>
      <p className="checkpoint-reaction">{reaction}</p>
      {showFeedback ? (
        <div className="feedback-area">
          <textarea
            value={feedback}
            onChange={e => setFeedback(e.target.value)}
            placeholder="Tell Sage what to do differently..."
            rows={3}
          />
          <div className="feedback-actions">
            <button className="btn-ghost" onClick={() => setShowFeedback(false)}>Cancel</button>
            <button className="btn-primary" onClick={() => onRegenerate(feedback)}>Regenerate</button>
          </div>
        </div>
      ) : (
        <div className="checkpoint-actions">
          <button className="btn-approve" onClick={onApprove}>Approve & continue</button>
          <button className="btn-secondary" onClick={onEdit}>Edit</button>
          <button className="btn-secondary" onClick={() => setShowFeedback(true)}>Regenerate</button>
        </div>
      )}
    </div>
  );
}

export default function App() {
  const [apiKey, setApiKey] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState('');
  const [keyError, setKeyError] = useState('');

  const [messages, setMessages] = useState([]);
  const [stageIdx, setStageIdx] = useState(-1);
  const [completedKeys, setCompletedKeys] = useState([]);
  const [context, setContext] = useState({});
  const [loading, setLoading] = useState(false);
  const [problem, setProblem] = useState('');
  const [problemInput, setProblemInput] = useState('');
  const [phase, setPhase] = useState('welcome'); // welcome | problem | running | done

  const [pendingCheckpoint, setPendingCheckpoint] = useState(null);
  const [checkpointFeedback, setCheckpointFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);

  const [memory] = useState(() => loadMemory());
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const addMessage = useCallback((msg) => {
    setMessages(prev => [...prev, { id: Date.now() + Math.random(), ...msg }]);
  }, []);

  const handleKeySubmit = async () => {
    if (!apiKeyInput.trim()) return;
    if (!apiKeyInput.startsWith('sk-ant-')) {
      setKeyError('Key should start with sk-ant-');
      return;
    }
    setApiKey(apiKeyInput.trim());
    setKeyError('');
    memory.sessionCount += 1;
    saveMemory(memory);

    const isReturn = memory.sessionCount > 1;
    const lastProblem = memory.pastProblems?.slice(-1)[0];
    const greeting = isReturn
      ? `Welcome back. ${lastProblem ? `Last time we worked on "${lastProblem.slice(0, 60)}...".` : ''} Session ${memory.sessionCount} — let's get into it.`
      : `Hi — I'm Sage, your PM partner. We're going to work through the full product lifecycle together, one stage at a time. I'll do the drafting; you make the calls. Let's build something good.`;

    addMessage({ type: 'sage', content: greeting });
    sageSpeak(greeting);
    setTimeout(() => {
      addMessage({ type: 'sage', content: "What product problem are we solving today? Give me a clear, specific problem statement and I'll take it from there." });
      setPhase('problem');
    }, 800);
  };

  const handleProblemSubmit = async () => {
    if (!problemInput.trim()) return;
    const p = problemInput.trim();
    setProblem(p);
    setContext({ problem: p, memory: memory.sessionCount > 1 ? `Past sessions: ${memory.sessionCount}` : '' });

    memory.pastProblems = [...(memory.pastProblems || []), p].slice(-10);
    saveMemory(memory);

    addMessage({ type: 'user', content: p });
    setPhase('running');
    await runNextStage(0, { problem: p });
  };

  const runNextStage = useCallback(async (idx, ctx) => {
    if (idx >= STAGES.length) {
      await finalize(ctx);
      return;
    }

    const stage = STAGES[idx];
    setStageIdx(idx);
    setLoading(true);

    addMessage({ type: 'sage-intro', stageKey: stage.key, content: stage.intro, icon: stage.icon, label: stage.label });
    sageSpeak(stage.intro);

    try {
      const output = await runStage(stage.key, ctx, apiKey || apiKeyInput);
      const reaction = await getSageReaction(stage.key, output, apiKey || apiKeyInput);

      const newCtx = { ...ctx, [stage.key]: output };
      setContext(newCtx);

      addMessage({ type: 'artifact', stageKey: stage.key, stageLabel: stage.label, content: output });
      setLoading(false);
      sageSpeak(reaction);
      setPendingCheckpoint({ idx, ctx: newCtx, stage, reaction, output });
    } catch (err) {
      setLoading(false);
      addMessage({ type: 'error', content: `Error: ${err.message}` });
    }
  }, [apiKey, apiKeyInput, addMessage]);

  useEffect(() => {
    if (pendingCheckpoint) {
      const { reaction, idx, ctx, stage } = pendingCheckpoint;
      addMessage({
        type: 'checkpoint',
        stageKey: stage.key,
        reaction,
        onApprove: () => handleApprove(idx, ctx),
        onEdit: () => handleEdit(idx, ctx, stage),
        onRegenerate: (fb) => handleRegenerate(idx, ctx, stage, fb)
      });
    }
  }, [pendingCheckpoint]);

  const handleApprove = useCallback(async (idx, ctx) => {
    memory.preferences.approvals = [...(memory.preferences.approvals || []), STAGES[idx].key].slice(-20);
    saveMemory(memory);
    setCompletedKeys(prev => [...prev, STAGES[idx].key]);
    setPendingCheckpoint(null);
    setShowFeedback(false);
    setCheckpointFeedback('');
    const approvalMsg = `Got it. Moving to ${STAGES[idx + 1] ? STAGES[idx + 1].label : 'the final summary'}.`;
    addMessage({ type: 'sage', content: approvalMsg });
    sageSpeak(approvalMsg);
    await runNextStage(idx + 1, ctx);
  }, [memory, addMessage, runNextStage]);

  const handleEdit = useCallback((idx, ctx, stage) => {
    addMessage({ type: 'sage', content: `No problem — make your edits and paste the updated version below. I'll use your version for the next stage.` });
    addMessage({ type: 'edit-input', stageKey: stage.key, idx, ctx });
    setPendingCheckpoint(null);
  }, [addMessage]);

  const handleRegenerate = useCallback(async (idx, ctx, stage, feedback) => {
    setPendingCheckpoint(null);
    setShowFeedback(false);
    setCheckpointFeedback('');
    memory.preferences.edits = [...(memory.preferences.edits || []), stage.key].slice(-20);
    saveMemory(memory);
    addMessage({ type: 'sage', content: `Noted — "${feedback}". Let me rework that.` });
    setLoading(true);

    try {
      const feedbackCtx = { ...ctx, [`${stage.key}_feedback`]: feedback };
      const output = await runStage(stage.key, feedbackCtx, apiKey || apiKeyInput);
      const reaction = await getSageReaction(stage.key, output, apiKey || apiKeyInput);
      const newCtx = { ...ctx, [stage.key]: output };
      setContext(newCtx);
      addMessage({ type: 'artifact', stageKey: stage.key, stageLabel: stage.label, content: output });
      setLoading(false);
      setPendingCheckpoint({ idx, ctx: newCtx, stage, reaction, output });
    } catch (err) {
      setLoading(false);
      addMessage({ type: 'error', content: `Error: ${err.message}` });
    }
  }, [apiKey, apiKeyInput, addMessage]);

  const finalize = useCallback(async (ctx) => {
    setLoading(true);
    addMessage({ type: 'sage', content: "We've made it through all 7 stages. Let me put together your executive summary..." });
    try {
      const summary = await getSummary(ctx, apiKey || apiKeyInput);
      addMessage({ type: 'artifact', stageKey: 'summary', stageLabel: 'Executive Summary', content: summary });
      setLoading(false);
      addMessage({ type: 'sage', content: "That's a wrap. You now have a complete product lifecycle — discovery through GTM — all in one session. Every artifact is available to expand and download above. Good work." });
      setPhase('done');
      setStageIdx(STAGES.length);
    } catch (err) {
      setLoading(false);
      addMessage({ type: 'error', content: `Error generating summary: ${err.message}` });
    }
  }, [apiKey, apiKeyInput, addMessage]);

  const downloadArtifact = (content, name) => {
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `sage_${name.toLowerCase().replace(/\s/g, '_')}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = () => {
    const all = STAGES.filter(s => context[s.key]).map(s => `# ${s.label}\n\n${context[s.key]}`).join('\n\n---\n\n');
    downloadArtifact(all, 'full_bundle');
  };

  if (!apiKey && phase === 'welcome') {
    return (
      <div className="splash">
        <div className="splash-content">
          <div className="splash-avatar">S</div>
          <h1 className="splash-title">Sage</h1>
          <p className="splash-sub">AI-powered PM lifecycle agent</p>
          <p className="splash-desc">From problem statement to GTM plan — 7 stages, human-in-the-loop at every step.</p>
          <div className="key-input-group">
            <input
              type="password"
              value={apiKeyInput}
              onChange={e => setApiKeyInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleKeySubmit()}
              placeholder="Enter your Anthropic API key"
              className="key-input"
            />
            <button className="btn-start" onClick={handleKeySubmit}>Start →</button>
          </div>
          {keyError && <p className="key-error">{keyError}</p>}
          <p className="key-note">Your key is stored only in your browser session and never sent anywhere except the Anthropic API.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-left">
          <SageAvatar size={32} />
          <div>
            <span className="header-title">Sage</span>
            <span className="header-sub"> · PM Lifecycle Agent</span>
          </div>
        </div>
        {stageIdx >= 0 && (
          <StageBar stages={STAGES} currentIdx={stageIdx} completedKeys={completedKeys} />
        )}
        {phase === 'done' && (
          <button className="btn-download-all" onClick={downloadAll}>⬇ Download all</button>
        )}
      </header>

      <main className="chat-area">
        {messages.map((msg) => {
          if (msg.type === 'sage' || msg.type === 'error') {
            return (
              <div key={msg.id} className={`message sage-message ${msg.type === 'error' ? 'error' : ''}`} style={{ animation: 'fadeUp 0.3s ease' }}>
                <SageAvatar />
                <div className="bubble sage-bubble">
                  <span className="bubble-sender">Sage</span>
                  <p>{msg.content}</p>
                </div>
              </div>
            );
          }

          if (msg.type === 'sage-intro') {
            return (
              <div key={msg.id} className="message sage-message" style={{ animation: 'fadeUp 0.3s ease' }}>
                <SageAvatar />
                <div className="bubble sage-bubble intro-bubble">
                  <div className="intro-stage-label">
                    <span>{msg.icon}</span>
                    <span>Stage — {msg.label}</span>
                  </div>
                  <p className="intro-text">{msg.content}</p>
                </div>
              </div>
            );
          }

          if (msg.type === 'user') {
            return (
              <div key={msg.id} className="message user-message" style={{ animation: 'fadeUp 0.3s ease' }}>
                <div className="bubble user-bubble">{msg.content}</div>
              </div>
            );
          }

          if (msg.type === 'artifact') {
            return (
              <div key={msg.id} className="message sage-message wide" style={{ animation: 'fadeUp 0.3s ease' }}>
                <SageAvatar />
                <ArtifactCard stageName={msg.stageLabel} content={msg.content} onDownload={downloadArtifact} />
              </div>
            );
          }

          if (msg.type === 'checkpoint') {
            return (
              <div key={msg.id} className="message sage-message" style={{ animation: 'fadeUp 0.3s ease' }}>
                <CheckpointCard
                  reaction={msg.reaction}
                  onApprove={msg.onApprove}
                  onEdit={msg.onEdit}
                  onRegenerate={msg.onRegenerate}
                  feedback={checkpointFeedback}
                  setFeedback={setCheckpointFeedback}
                  showFeedback={showFeedback}
                  setShowFeedback={setShowFeedback}
                />
              </div>
            );
          }

          if (msg.type === 'edit-input') {
            return (
              <EditInput
                key={msg.id}
                stageKey={msg.stageKey}
                idx={msg.idx}
                ctx={msg.ctx}
                onSubmit={async (edited) => {
                  const newCtx = { ...msg.ctx, [msg.stageKey]: edited };
                  setContext(newCtx);
                  setCompletedKeys(prev => [...prev, msg.stageKey]);
                  addMessage({ type: 'sage', content: 'Got it — using your version. Moving on.' });
                  await runNextStage(msg.idx + 1, newCtx);
                }}
              />
            );
          }

          return null;
        })}

        {loading && <TypingIndicator />}

        {phase === 'problem' && (
          <div className="input-row" style={{ animation: 'fadeUp 0.3s ease' }}>
            <textarea
              className="problem-input"
              value={problemInput}
              onChange={e => setProblemInput(e.target.value)}
              placeholder="Describe the product problem you want to solve..."
              rows={3}
              onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleProblemSubmit(); } }}
            />
            <button className="btn-send" onClick={handleProblemSubmit} disabled={!problemInput.trim()}>→</button>
          </div>
        )}

        <div ref={bottomRef} />
      </main>
    </div>
  );
}

function EditInput({ stageKey, idx, ctx, onSubmit }) {
  const [val, setVal] = useState('');
  return (
    <div className="message sage-message wide" style={{ animation: 'fadeUp 0.3s ease' }}>
      <div className="edit-card">
        <p className="edit-label">Paste your edited {stageKey} content below:</p>
        <textarea
          className="edit-textarea"
          value={val}
          onChange={e => setVal(e.target.value)}
          placeholder="Paste your edited version here..."
          rows={8}
        />
        <div className="edit-actions">
          <button className="btn-primary" onClick={() => val.trim() && onSubmit(val.trim())} disabled={!val.trim()}>
            Use this version →
          </button>
        </div>
      </div>
    </div>
  );
}
