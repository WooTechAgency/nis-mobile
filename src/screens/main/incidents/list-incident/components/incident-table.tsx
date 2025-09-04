import { images } from '@assets/images';
import SelectedFilter from '@components/common/selected-filter';
import { Button, FlatList, Image, Text, View } from '@components/ui';
import DropdownMenu from '@components/ui/DropdownMenu';
import { useToggle } from '@hooks/useToggle';
import { useGetIncidentTypes } from '@services/hooks/incident/useGetIncidentTypes';
import { useGetSites } from '@services/hooks/useGetSites';
import { IncidentReport } from '@services/incident.service';
import { convertDDMMYYYY } from '@utils/date.util';
import React from 'react';
import { Control, UseFormSetValue, useWatch } from 'react-hook-form';


const percent = {
  id: 'w-[15%]',
  date: 'w-[18%]',
  type: 'w-[33%]'
}
const headerCls = 'text-[12px] font-medium text-neutral50'
const rowCls = 'text-[16px] text-neutral70'

interface Props {
  control: Control<any, any>,
  setValue: UseFormSetValue<any>,
  incidents: IncidentReport[] | undefined
}
export default function IncidentTable({ control, setValue, incidents }: Props) {

  const [visibleSites, toggleVisibleSites] = useToggle(false);
  const [visibleDate, toggleVisibleDate] = useToggle(false);
  const [visibleType, toggleVisibleType] = useToggle(false);

  const { data: sites } = useGetSites();
  const { data: incidentTypes } = useGetIncidentTypes();
  console.log('incidentTypes ', incidentTypes)

  const filters = [
    { icon: images.date32, name: 'date', title: 'Date', listValue: sites, visible: visibleDate, toggleVisible: toggleVisibleDate },
    { icon: images.incidentType, name: 'type', title: 'Incident Type', listValue: incidentTypes, visible: visibleType, toggleVisible: toggleVisibleType },
    { icon: images.location, name: 'site', title: 'Site', listValue: sites, visible: visibleSites, toggleVisible: toggleVisibleSites },

  ]

  const site = useWatch({ control, name: 'site' })
  const date = useWatch({ control, name: 'date' })

  return (
    <View>
      <View className='bg-white mt-6 rounded-[20px] p-6 '>
        <View className='flex-row items-center justify-between'>
          {site ? <SelectedFilter label={site?.label} name='site' setValue={setValue} /> : <View />}
          <View className='flex-row gap-x-4 self-end'>
            {filters.map((filter, index) => (
              <DropdownMenu
                key={index}
                visible={filter.visible}
                toggleVisible={filter.toggleVisible}
                listValue={filter?.listValue || []}
                setValue={setValue}
                control={control}
                name={filter.name}
              >
                <Button
                  className='row-center justify-center w-[135px] h-8 border border-primary rounded-lg '
                  key={filter.title}
                  onPress={filter.toggleVisible}
                >
                  <Image source={filter.icon} className='w-8 h-8' />
                  <Text className='text-[12px] font-medium'>{filter.title}</Text>
                </Button>
              </DropdownMenu>
            ))}
          </View>
        </View>
        <FlatList
          className='mt-4'
          scrollEnabled={false}
          data={incidents}
          keyExtractor={(item) => item.id}
          ListHeaderComponent={
            <View className='flex-row h-10 items-center border-t border-neutral20'>
              <View className={`flex-row items-center gap-x-2 ${percent.id}`}>
                <Text className={`${headerCls} text-neutral80`}>{'Incident ID'}</Text>
                <Image source={images.arrowDown} className='w-4 h-4' />
              </View>
              <Text className={`${percent.date} ${headerCls}`}>{"Date of Incident"}</Text>
              <Text className={`${percent.type}  ${headerCls}`}>{'Incident Type'}</Text>
              <Text className={`flex-grow ${headerCls}`}>{'Site'}</Text>
            </View>
          }
          renderItem={({ item }: { item: IncidentReport }) => (
            <View className='flex-row h-[56px] items-center border-t border-neutral20'>
              <Text className={`${percent.id} ${rowCls}`}>{item.code}</Text>
              <Text className={`${percent.date} ${rowCls}`}>{convertDDMMYYYY(item.date_of_report)}</Text>
              <Text className={`${percent.type}  ${rowCls}`}>{item.incident_types.map((item => item.name)).join(" / ")}</Text>
              <Text className={`flex-grow ${rowCls}`}>{item.site.site_name}</Text>
            </View>
          )
          }
        />
      </View>
    </View>
  )
}