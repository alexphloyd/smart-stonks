import Form from '@/components/Form/Form';
import LabeledTextField from '@/components/textFields/LabeledTextField/LabeledTextField';
import { createApiKey } from '@/features/apiKeys/slice/thunks/createApiKey';
import { TApiKey, TCreateApiKeyPayload } from '@/features/apiKeys/types/types';
import { ApiKey } from '@/features/apiKeys/types/validation';
import { useAppDispatch, useAppSelector } from '@/store/hooks/hooks';
import { forwardRef, Ref, useState } from 'react';
import s from '../../ControlBar/ApiKeysContolBar.module.css';

export const CreateApiKeyForm = forwardRef((props, ref: Ref<HTMLFormElement>) => {
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.auth.user?.id);

  const [inputErrors, setInputErrors] = useState<object | null>(null);
  const handleSetInputErrors = (errors: object | null) => setInputErrors(errors);

  const handleAddApiKey = async (apiKeyData: TApiKey) => {
    dispatch(createApiKey({ ...apiKeyData, userId } as TCreateApiKeyPayload));
  };

  return (
    <Form
      ref={ref}
      schema={ApiKey}
      onSubmit={handleAddApiKey}
      setInputsError={handleSetInputErrors}
      className={s.createKeyForm}
    >
      <LabeledTextField
        name='name'
        label='Label'
        errors={inputErrors}
        placeholder='API Key Label..'
        inputSize='small'
        addClass={s.input}
        maxWidth={'none'}
        autoComplete={'off'}
      />
      <LabeledTextField
        name='key'
        label='API Key'
        errors={inputErrors}
        placeholder='Key..'
        inputSize='small'
        addClass={s.input}
        maxWidth={'none'}
        autoComplete={'off'}
      />
      <LabeledTextField
        name='secret'
        label='Secret Key'
        errors={inputErrors}
        placeholder='Secret Key..'
        inputSize='small'
        addClass={s.lastInput}
        maxWidth={'none'}
        autoComplete={'off'}
      />
    </Form>
  );
});
