import { colors } from '@constants/colors.constants';

export interface SelectItem {
  key: string;
  title: string;
  bg: string
  index: number
}
export const likeliHoodOptions = [
  { key: 'low', title: 'Rare', bg: colors.neutral40, index:4  },
  { key: 'unlikely', title: 'Unlikely', bg: colors.neutral50, index:3  },
  { key: 'medium', title: 'Possible', bg: colors.orange1, index:2 },
  { key: 'high', title: 'Likely', bg: colors.orange3, index:1 },
  { key: 'Almost Certain', title: 'Almost Certain', bg:colors.negative30 , index:0 },
];

export const consequenceOptions = [
  { key: 'low', title: 'Minor', bg: colors.neutral40,  index:3 },
  { key: 'medium', title: 'Moderate', bg: colors.orange1,index:2},
  { key: 'high', title: 'Major',  bg: colors.orange3,index:1},
  { key: 'Almost Certain', title: 'Catastrophic', bg: colors.negative30, index:0   },
];

export const riskRating =[
  [
    {  title: 'Almost Certain', bg: colors.negative30 },
    {  title: 'Likely', bg: colors.negative30 },
    { title: 'Possible', bg: colors.negative30 },
    {  title: 'Unlikely', bg: colors.orange3 },
    {  title: 'Rare', bg: colors.orange3 },
  ],
  [
    // Catastrophic row
    { key: 'h1', title: 'H1', bg: colors.negative30 },
    { key: 'h2', title: 'H2', bg: colors.negative30 },
    { key: 'h3', title: 'H3', bg: colors.negative30 },
    { key: 'h4', title: 'M7', bg: colors.orange3 },
    { key: 'h5', title: 'M11', bg: colors.orange3 },
  ],
  [
     // Major row
    { key: 'H4', title: 'H4', bg: colors.negative30 },
    { key: 'H5', title: 'H5', bg: colors.negative30 },
    { key: 'M8', title: 'M8', bg: colors.orange3 },
    { key: 'M12', title: 'M12', bg: colors.orange3 },
    { key: 'L15', title: 'L15', bg: colors.neutral40 },
  ],
  [
     // Moderate  row
    { key: 'h1', title: 'H6', bg: colors.negative30 },
    { key: 'h2', title: 'M9', bg: colors.orange3 },
    { key: 'h3', title: 'M13', bg: colors.orange3 },
    { key: 'h4', title: 'L16', bg: colors.neutral40 },
    { key: 'h5', title: 'L18', bg: colors.neutral40 },
  ],
  [
     // Minor row
    { key: 'h1', title: 'M10', bg: colors.orange3 },
    { key: 'h2', title: 'M14', bg: colors.orange3 },
    { key: 'h3', title: 'L17', bg: colors.neutral40 },
    { key: 'h4', title: 'L19', bg: colors.neutral40 },
    { key: 'h5', title: 'L20', bg: colors.neutral40 },
  ]
]

export const TeamLeaderCheckList = [
  { key: 1, title: 'Site Induction completed by all personnel', },
  { key: 2, title: 'SWMS reviewed and understood', },
  { key: 3, title: 'PPE worn (hi-vis, boots, gloves, glasses)', },
  { key: 4, title: 'Emergency evacuation plan reviewed', },
  { key: 5, title: 'Emergency Assembly point identified and communicated', },
  // { key: '', title: 'First Aid kit available and accessible', },
  // { key: '', title: 'Site-specific hazards checked and documented', },
  // { key: '', title: 'All personnel free from the effects of drugs and alcohol', },
  // { key: '', title: 'All personnel free from the effects of fatigue ', },
];