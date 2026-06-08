import { useFormStore } from '../store/formStore';
import type { FormSource } from '../types/form';

const sourceLabels: Record<FormSource, string> = {
  uncontrolled: 'Uncontrolled',
  'react-hook-form': 'React Hook Form',
};

export const SubmissionList = () => {
  const submissions = useFormStore((state) => state.submissions);

  if (submissions.length === 0) {
    return (
      <section className="empty-state" aria-labelledby="submissions-title">
        <h2 id="submissions-title">Submissions</h2>
        <p>Successful form submissions will appear here.</p>
      </section>
    );
  }

  return (
    <section className="submissions-section" aria-labelledby="submissions-title">
      <div className="section-heading">
        <h2 id="submissions-title">Submissions</h2>
        <span>{submissions.length}</span>
      </div>

      <div className="submission-grid">
        {submissions.map((submission) => (
          <article className={`submission-card ${submission.isNew ? 'is-new' : ''}`} key={submission.id}>
            <img alt={`${submission.name} upload`} className="submission-image" src={submission.image} />
            <div className="submission-body">
              <div className="submission-title-row">
                <h3>{submission.name}</h3>
                <span>{sourceLabels[submission.source]}</span>
              </div>
              <dl>
                <div>
                  <dt>Age</dt>
                  <dd>{submission.age}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>{submission.email}</dd>
                </div>
                <div>
                  <dt>Gender</dt>
                  <dd>{submission.gender}</dd>
                </div>
                <div>
                  <dt>Country</dt>
                  <dd>{submission.country}</dd>
                </div>
              </dl>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
