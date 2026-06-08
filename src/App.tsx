import { useEffect, useRef, useState } from 'react';
import './App.css';
import { Modal } from './components/Modal';
import { ReactHookFormProfileForm } from './components/ReactHookFormProfileForm';
import { SubmissionList } from './components/SubmissionList';
import { UncontrolledProfileForm } from './components/UncontrolledProfileForm';
import { useFormStore } from './store/formStore';

type ActiveForm = 'uncontrolled' | 'react-hook-form' | null;

const modalTitles: Record<Exclude<ActiveForm, null>, string> = {
  uncontrolled: 'Uncontrolled form',
  'react-hook-form': 'React Hook Form',
};

function App() {
  const [activeForm, setActiveForm] = useState<ActiveForm>(null);
  const markSubmissionAsSeen = useFormStore((state) => state.markSubmissionAsSeen);
  const timeoutIds = useRef<number[]>([]);

  useEffect(
    () => () => {
      timeoutIds.current.forEach((timeoutId) => {
        window.clearTimeout(timeoutId);
      });
    },
    [],
  );

  const handleSubmitted = (id: string) => {
    setActiveForm(null);
    const timeoutId = window.setTimeout(() => {
      markSubmissionAsSeen(id);
      timeoutIds.current = timeoutIds.current.filter((currentId) => currentId !== timeoutId);
    }, 3000);

    timeoutIds.current = [...timeoutIds.current, timeoutId];
  };

  const closeModal = () => {
    setActiveForm(null);
  };

  return (
    <main className="app-shell">
      <section className="toolbar" aria-labelledby="page-title">
        <div>
          <h1 id="page-title">React Forms</h1>
          <p>Two validation flows, one submission history.</p>
        </div>
        <div className="toolbar-actions">
          <button className="secondary-button" onClick={() => setActiveForm('uncontrolled')} type="button">
            Open uncontrolled form
          </button>
          <button className="primary-button" onClick={() => setActiveForm('react-hook-form')} type="button">
            Open React Hook Form
          </button>
        </div>
      </section>

      <SubmissionList />

      {activeForm && (
        <Modal onClose={closeModal} title={modalTitles[activeForm]}>
          {activeForm === 'uncontrolled' ? (
            <UncontrolledProfileForm onSubmitted={handleSubmitted} />
          ) : (
            <ReactHookFormProfileForm onSubmitted={handleSubmitted} />
          )}
        </Modal>
      )}
    </main>
  );
}

export default App;
