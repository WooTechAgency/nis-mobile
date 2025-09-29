import { images } from '@assets/images';
import { ShowDocumentModal } from '@components/modal/show-document-model';
import { Button, Image, Wrapper, YesNoForm } from '@components/ui';
import Loading from '@components/ui/Loading';
import { TextInput } from '@components/ui/TextInput';
import { QUERY_KEY } from '@constants/keys.constants';
import { yupResolver } from '@hookform/resolvers/yup';
import { useToggle } from '@hooks/useToggle';
import { navigate } from '@routes/navigationRef';
import { RouteName } from '@routes/types';
import { addMoreHazardsApi, DSRA } from '@services/dsra.service';
import { useQueryClient } from '@tanstack/react-query';
import { convertHazardForm, convertHazardFromBE } from '@utils/functions.util';
import React, { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { Keyboard, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import * as yup from 'yup';
import { DailyAssessmentSteps, useAssessmentContext, } from '@screens/main/daily-assessment/context';
import { useUpsertDailyAssessment } from '@screens/main/daily-assessment/useUpsertDailyAessment';
import { HazardItem } from '../components/hazard-item';
import { SelectItem } from '@screens/main/daily-assessment/config.assessment';

export interface Props {
  editingMode: boolean,
  dsraData: DSRA
}
export interface HazardForm {
  description?: string;
  medias?: Asset[];
  likelihood?: SelectItem;
  consequence?: SelectItem;
  consequenceDes?: string;
  initialRiskRating?: SelectItem;
  controlMeasure?: string;
  residualRiskRating?: SelectItem;
}

export interface HazardsForm {
  haveHazards?: boolean;
  hazards?: HazardForm[];
}

const hazardDefault = {
  description: '',
}

const formSchema = yup.object().shape({
  haveHazards: yup.boolean().notRequired(),
  hazards: yup
    .array()
    .notRequired()
    .of(
      yup.object({
        description: yup.string().required('Description is required!'),
        medias: yup.mixed().notRequired(),
        likelihood: yup.object().required('Likelihood is required!'),
        consequence: yup.object().required('Consequence is required!'),
        consequenceDes: yup.string().required('Consequence is required!'),
        initialRiskRating: yup.object().required('Initial risk rating is required!'),
        controlMeasure: yup.string().required('Control measure is required!'),
        residualRiskRating: yup.object().required('Residual rating is required!')
      })
    ).nullable(),
});

export default function StepHazards({ editingMode, dsraData }: Props) {
  const { setAssessment, assessment: { completedSteps, generalInfo, hazard } } = useAssessmentContext();
  const { upsertDailyAssessment } = useUpsertDailyAssessment()
  const queryClient = useQueryClient()
  const [loading, setLoading] = useState(false)
  const [showDocument, toggleShowDocument] = useToggle(false)
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    defaultValues: {
      haveHazards: hazard?.haveHazards || !!dsraData?.hazards || false,
      hazards: hazard?.hazards || convertHazardFromBE(dsraData?.hazards || []) || []
    },
    mode: 'all',
    resolver: yupResolver(formSchema),
  });

  const haveHazards = watch('haveHazards')

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'hazards',
  });

  const addField = () => {
    Keyboard.dismiss()
    append(hazardDefault);
  };

  const onBack = () => {
    if (!!dsraData?.id) {
      navigate(RouteName.DailyAssessmentPreview, { dsraId: dsraData?.id })
    } else {
      setAssessment((prev) => ({ ...prev, selectedIndex: DailyAssessmentSteps.General }))
    }
  }

  const onSubmit = (form: HazardsForm) => {
    const newCompletedSteps = new Set([DailyAssessmentSteps.Hazards, ...(completedSteps || [])]);
    setAssessment((prev) => ({
      ...prev,
      hazard: form,
      selectedIndex: DailyAssessmentSteps.FirstAid,
      completedSteps: Array.from(newCompletedSteps)
    }))
    editingMode && navigate(RouteName.DailyAssessmentPreview)
    upsertDailyAssessment({ hazard: form, completedSteps: Array.from(newCompletedSteps) })
  }

  const onAddMoreHazard = async (form: HazardsForm) => {
    const updatedHazards = form?.hazards?.filter((item) => !item?.dsra_id)
    console.log('updatedHazards ', updatedHazards)
    if (updatedHazards && updatedHazards.length > 0) {
      const payload = convertHazardForm(updatedHazards || [])
      try {
        setLoading(true)
        await addMoreHazardsApi(dsraData?.id, payload)
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.DSRAS] })
      } finally {
        setLoading(false)
      }
    }
    navigate(RouteName.DailyAssessmentPreview, { dsraId: dsraData?.id })
  }

  const removeField = (index: number) => {
    remove(index)
  }

  const onCheckSWMS = () => {
    toggleShowDocument()
  }

  useEffect(() => {
    if (!haveHazards) {
      setValue('hazards', [])
    } else if (haveHazards && fields.length === 0) {
      append(hazardDefault);
    }
  }, [haveHazards])

  return (
    <View className='mt-6 gap-y-8'>
      {/* check hazard */}
      <Wrapper className={`mt-[0px] gap-y-8`} pointerEvents={!!dsraData?.id ? 'none' : undefined}>
        <View className='row-center gap-x-6' >
          <TextInput
            classNameWrap='flex-1 '
            errors={errors}
            control={control}
            name={`methodStatement`}
            label='Please describe the hazard'
            value={generalInfo?.methodStatement || dsraData?.site?.swms?.swms_name}
            editable={false}
            classNameInput='text-[#4A4646]'
          />
          <Button
            onPress={onCheckSWMS}
            label='Check SWMS'
            className='w-[280px] '
          />
        </View>
        <YesNoForm
          errors={errors}
          control={control}
          name={`haveHazards`}
          label='Are there any additional site hazards?*'
          setValue={setValue}
          isRadio
        />
      </Wrapper>
      {haveHazards &&
        <>
          {fields.map((item, index) => {
            return (
              <View key={item.id} style={{ zIndex: 50 - index }}>
                <HazardItem
                  submitted={!!item?.dsra_id} // dsra_id is a field get from BE
                  index={index}
                  classNameWrap='mt-6'
                  control={control}
                  setValue={setValue}
                  errors={errors}
                  name={`hazards.${index}`}
                  onDeleteHazard={removeField}
                  trigger={trigger}
                />
              </View>
            );
          })}
          <Button
            onPress={addField}
            iconButton={<Image source={images.plus} className='w-8 h-8' />}
            label='Add Hazard'
            type='small'
          />
        </>
      }
      <View className='mt-6 flex-row gap-x-6'>
        <Button label={!!dsraData?.id ? 'Cancel' : 'Back'} onPress={onBack} type='outlined' className='flex-1' />
        <Button
          label={editingMode ? 'Save' : 'Next'}
          onPress={handleSubmit(!!dsraData?.id ? onAddMoreHazard : onSubmit)}
          className='flex-1'
        />
      </View>

      <ShowDocumentModal
        visible={showDocument}
        toggleModal={toggleShowDocument}
        url={generalInfo?.location.swms.attachment || dsraData?.site?.swms?.attachment}
      />
      <Loading loading={loading} />
    </View>
  )
}