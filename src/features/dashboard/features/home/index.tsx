import { useCallback, useMemo, useState, createContext, useContext } from 'react';
import {
  Steps,
  Button,
  Form,
  Input,
  Checkbox,
  Select,
  type FormInstance,
  type InputProps,
  type CheckboxProps,
  type SelectProps,
  type FormItemProps,
} from 'antd';

import { type Section, useFetchFormStructure } from 'api';
import { LoadingScreen } from 'common/components';

type StartFormValues = { name: string };

const HomeContainer = () => {
  const { formStructure, isLoading } = useFetchFormStructure('1');

  const [stage, setStage] = useState<'start' | 'steps' | 'summary'>('start');

  const [name, setName] = useState('');

  const [payload, setPayload] = useState<unknown>();

  const handleStartSubmit = useCallback(
    (values: StartFormValues) => {
      setName(values.name);
      setStage('steps');
    },
    [setName]
  );

  const handleStepsSubmit = useCallback(
    (payload: unknown) => {
      setPayload(payload);
      setStage('summary');
    },
    [setPayload, setStage]
  );

  const handleBackToSteps = useCallback(() => {
    setStage('steps');
  }, [setStage]);

  const handleSubmitToAPI = useCallback(() => {
    console.log('Submitting to API:', { name, payload });
  }, [name, payload]);

  if (isLoading || !formStructure) {
    return <LoadingScreen />;
  }

  return (
    <>
      {stage === 'start' && (
        <Form<StartFormValues> onFinish={handleStartSubmit}>
          <Form.Item label="Name" name="name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Next
          </Button>
        </Form>
      )}
      {stage === 'steps' && (
        <Wizard
          sections={formStructure.sections}
          onSubmit={handleStepsSubmit}
          initialValues={payload}
        />
      )}
      {stage === 'summary' && (
        <>
          <h2>Summary</h2>
          <p>Name: {name}</p>
          <p>{JSON.stringify(payload)}</p>
          <Button onClick={handleBackToSteps}>Back</Button>
          <Button type="primary" htmlType="submit" onClick={handleSubmitToAPI}>
            Submit
          </Button>
        </>
      )}
    </>
  );
};

export default HomeContainer;

type StepsContextProps = {
  currentStep: number;
  totalSteps: number;
  goToStep: (step: number) => Promise<void>;
  goNext: () => Promise<void>;
  goBack: () => Promise<void>;
};

const StepsContext = createContext({} as StepsContextProps);

const sectionsConfig: Record<string, { title: string }> = {
  section1: { title: 'Section 1' },
  section2: { title: 'Section 2' },
};

function getSectionConfig(name: string) {
  if (!sectionsConfig[name]) {
    console.error(`Missing data for section ${name}`);
  }
  return sectionsConfig[name] ?? { title: 'Missing Title' };
}

type FieldConfig = {
  label: string;
  rules: FormItemProps['rules'];
} & (
  | { type: 'input'; inputProps?: InputProps }
  | { type: 'select'; inputProps?: SelectProps }
  | { type: 'checkbox'; inputProps?: CheckboxProps }
);

const fieldsConfig: Record<string, FieldConfig> = {
  title: {
    label: 'Title',
    rules: [{ required: true, type: 'string' }],
    type: 'input',
    inputProps: {
      placeholder: 'Something...',
    },
  },
  platform: {
    label: 'Platform',
    rules: [{ required: true, type: 'enum', enum: ['facebook', 'instagram'] }],
    type: 'select',
    inputProps: {
      options: [
        { label: 'Facebook', value: 'facebook' },
        { label: 'Instagram', value: 'instagram' },
      ],
    },
  },
  age: {
    label: 'Age',
    rules: [{ required: true, type: 'string' }],
    type: 'input',
  },
  adult: {
    label: 'Adult',
    rules: [{ type: 'boolean' }],
    type: 'checkbox',
  },
};

function getFieldConfig(name: string) {
  if (!fieldsConfig[name]) {
    console.error(`Missing data for field "${name}"`);
  }
  return fieldsConfig[name];
}

type WizardProps = {
  sections: Section[];
  onSubmit: (payload: unknown) => void;
  initialValues: unknown;
};

const Wizard = ({ sections, onSubmit, initialValues }: WizardProps) => {
  const [form] = Form.useForm();

  if (initialValues) {
    form.setFieldsValue(initialValues);
  }

  const [currentStep, setCurrentStep] = useState(0);

  const totalSteps = useMemo(() => sections.length, [sections]);

  const section = useMemo(() => sections[currentStep] as Section, [sections, currentStep]);

  const goToStep = useCallback(
    async (s: number) => {
      const step = Math.min(Math.max(s, 0), totalSteps - 1);

      try {
        if (step > currentStep) {
          await form.validateFields(section.inputs.map(({ name }) => name));
        }

        setCurrentStep(step);
      } catch {}
    },
    [form, section, currentStep, totalSteps, setCurrentStep]
  );

  const handleSubmit = useCallback(async () => {
    try {
      await form.validateFields();
      onSubmit(form.getFieldsValue(true));
    } catch {}
  }, [form, onSubmit]);

  const context = useMemo(
    () => ({
      currentStep,
      totalSteps,
      goToStep,
      goNext: () => goToStep(currentStep + 1),
      goBack: () => goToStep(currentStep - 1),
    }),
    [currentStep, totalSteps, goToStep]
  );

  return (
    <StepsContext.Provider value={context}>
      <WizardSteps sections={sections} />
      <WizardForm inputs={section.inputs} form={form} />
      <WizardButtons onSubmit={handleSubmit} />
    </StepsContext.Provider>
  );
};

const WizardSteps = ({ sections }: { sections: Section[] }) => {
  const { currentStep, goToStep } = useContext(StepsContext);

  return (
    <Steps current={currentStep} onChange={goToStep}>
      {sections.map(({ name }) => {
        const { title } = getSectionConfig(name);
        return <Steps.Step key={name} title={title} />;
      })}
    </Steps>
  );
};

const WizardForm = ({ inputs, form }: { inputs: Section['inputs']; form: FormInstance }) => (
  <Form form={form}>
    {inputs.map(({ name }) => {
      const config = getFieldConfig(name);

      if (!config) {
        return null;
      }

      return (
        <WizardFormItem
          key={name}
          name={name}
          type={config.type}
          inputProps={config.inputProps}
          label={config.label}
          rules={config.rules}
        />
      );
    })}
  </Form>
);

const WizardFormItem = ({
  name,
  type,
  inputProps,
  label,
  rules,
}: {
  name: string;
  type: FieldConfig['type'];
  inputProps: FieldConfig['inputProps'];
  label: FieldConfig['label'];
  rules: FieldConfig['rules'];
}) => {
  switch (type) {
    case 'input':
      return (
        <Form.Item name={name} label={label} rules={rules}>
          <Input {...(inputProps as InputProps)} />
        </Form.Item>
      );
    case 'checkbox':
      return (
        <Form.Item valuePropName="checked" name={name} label={label} rules={rules}>
          <Checkbox {...(inputProps as CheckboxProps)} />
        </Form.Item>
      );
    case 'select':
      return (
        <Form.Item name={name} label={label} rules={rules}>
          <Select {...(inputProps as SelectProps)} />
        </Form.Item>
      );
    default:
      return <></>;
  }
};

const WizardButtons = ({ onSubmit }: { onSubmit: () => void }) => {
  const { currentStep, goBack, goNext, totalSteps } = useContext(StepsContext);

  return (
    <>
      <Button disabled={currentStep === 0} onClick={goBack}>
        Back
      </Button>
      <Button type="primary" disabled={currentStep === totalSteps - 1} onClick={goNext}>
        Next
      </Button>
      <Button type="primary" disabled={currentStep < totalSteps - 1} onClick={onSubmit}>
        Submit
      </Button>
    </>
  );
};
