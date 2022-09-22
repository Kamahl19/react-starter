import { useMemo } from 'react';

/**
 * Types
 */

export type FormStructureResponse = {
  formStructure: FormStructure;
};

export type FormStructure = {
  id: string;
  sections: Section[];
};

export type Section = {
  name: string;
  inputs: Input[];
};

export type Input = {
  name: string;
};

/**
 * Endpoints
 */

export const useFetchFormStructure = (formId: string) => {
  return useMemo(
    () => ({
      formStructure: {
        id: formId,
        sections: [
          { name: 'section1', inputs: [{ name: 'title' }, { name: 'platform' }] },
          { name: 'section2', inputs: [{ name: 'age' }, { name: 'adult' }] },
        ],
      },
    }),
    [formId]
  );
};
