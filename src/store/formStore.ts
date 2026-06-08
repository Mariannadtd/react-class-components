import { create } from 'zustand';
import type { FormSource, ProfileFormData, Submission } from '../types/form';

const countries = [
  'Argentina',
  'Australia',
  'Brazil',
  'Canada',
  'France',
  'Georgia',
  'Germany',
  'Italy',
  'Japan',
  'Poland',
  'Spain',
  'United Kingdom',
  'United States',
];

type FormStore = {
  countries: string[];
  submissions: Submission[];
  addSubmission: (data: ProfileFormData, source: FormSource) => string;
  markSubmissionAsSeen: (id: string) => void;
};

export const useFormStore = create<FormStore>((set) => ({
  countries,
  submissions: [],
  addSubmission: (data, source) => {
    const id = crypto.randomUUID();

    set((state) => ({
      submissions: [
        {
          id,
          source,
          createdAt: new Date().toISOString(),
          name: data.name,
          age: data.age,
          email: data.email,
          gender: data.gender,
          terms: data.terms,
          image: data.image,
          country: data.country,
          isNew: true,
        },
        ...state.submissions,
      ],
    }));

    return id;
  },
  markSubmissionAsSeen: (id) => {
    set((state) => ({
      submissions: state.submissions.map((submission) =>
        submission.id === id ? { ...submission, isNew: false } : submission,
      ),
    }));
  },
}));
