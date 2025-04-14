import mock from '../mock'

// ** Utils
import { paginateArray } from '../utils'

const data = [
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: '',
    return_procedure_date: '',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 2,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '2',
    certificate_stage: '2',
    collect_procedure_name: '',
    collect_procedure_date: '',
    return_procedure_name: '',
    return_procedure_date: '',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 3,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '3',
    certificate_stage: '3',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: '',
    return_procedure_date: '',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 4,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '4',
    certificate_stage: '3',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 5,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 6,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 7,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 8,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 9,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 10,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 11,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 12,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 13,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 14,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 15,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 16,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 17,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 18,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 19,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 20,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 21,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 22,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 23,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 24,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '2',
    certificate_stage: '3',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 25,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 26,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 27,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 28,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 29,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 30,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 31,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 32,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 33,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 34,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 35,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  },
  {
    id: 1,
    plate_num: ' ٥٦٣٢',
    chasis_num: "أ ب س",
    plate_num_en: '5632',
    chasis_num_en: "ABC",
    type: 'خاص',
    status: '1',
    certificate_stage: '1',
    collect_procedure_name: 'محمد إسلام',
    collect_procedure_date: '01/10/2022 at 03:30 PM',
    return_procedure_name: 'ندى احمد',
    return_procedure_date: '01/10/2022 at 03:30 PM',
    company_name: 'شركة التيسير العربية للتمويل'
  }
]

mock.onGet('/api/datatables/initial-data').reply(() => {
  return [200, data]
})

mock.onGet('/api/datatables/data').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1 } = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = data.filter(
    item =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      item.plate_num.toLowerCase().includes(queryLowered) ||
      item.company_name.toLowerCase().includes(queryLowered) ||
      item.chasis_num.toLowerCase().includes(queryLowered) ||
      item.return_procedure_name.toLowerCase().includes(queryLowered) ||
      item.collect_procedure_name.toLowerCase().includes(queryLowered) ||
      item.type.toLowerCase().includes(queryLowered)
  )
  /* eslint-enable  */

  return [
    200,
    {
      allData: data,
      invoices: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})

const company = [
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 2,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 3,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 4,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 5,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 6,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 7,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 8,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 9,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 10,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 11,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 12,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 13,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 14,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 15,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 16,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 17,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 18,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 19,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 20,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 21,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 22,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 23,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 24,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 25,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 26,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 27,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 28,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 29,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 30,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 31,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 32,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 33,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 34,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 35,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'طريق الملك فهد بن عبدالعزيزعبدالعزيز',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  },
  {
    id: 1,
    identified_num: ' H1-649876',
    name: "شركة التيسير العربية للتمويل",
    phone: '0587654567',
    email: "info@tayseerme.com",
    address: 'عبدالعزيز, حي القشلة, مدينة الظهران',
    total: '50',
    under_process: '50',
    collected: '50',
    returned: '50'
  }
]

mock.onGet('/api/datatables/initial-company').reply(() => {
  return [200, company]
})

mock.onGet('/api/datatables/company').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1 } = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = company.filter(
    item =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      item.identified_num.toLowerCase().includes(queryLowered) ||
      item.name.toLowerCase().includes(queryLowered) ||
      item.phone.toLowerCase().includes(queryLowered) ||
      item.email.toLowerCase().includes(queryLowered) ||
      item.address.toLowerCase().includes(queryLowered) ||
      item.total.toLowerCase().includes(queryLowered)
  )
  /* eslint-enable  */

  return [
    200,
    {
      allData: company,
      invoices: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})


const dataHelpCenter = [
  {
    id: 1,
    identity_number: 'H1-649876',
    name: "احمد حسن",
    email: 'm.islam@tayseerme.com',
    date: '01/10/2022 at 03:30 PM',
    message: 'لا يمكنني تسجيل الخروج من التطبيق'

  }
]

mock.onGet('/api/datatables/initial-data').reply(() => {
  return [200, data]
})

mock.onGet('/api/datatables/dataHelpCenter').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1 } = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = dataHelpCenter.filter(
    item =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      item.identity_number.toLowerCase().includes(queryLowered) ||
      item.email.toLowerCase().includes(queryLowered) ||
      item.name.toLowerCase().includes(queryLowered) ||
      item.date.toLowerCase().includes(queryLowered) ||
      item.message.toLowerCase().includes(queryLowered)
  )
  /* eslint-enable  */

  return [
    200,
    {
      allData: data,
      invoices: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})
const dataEmployees = [
  {
    id: 1,
    identified_num: 'H1-649876',
    name: "احمد حسن",
    email: 'm.islam@tayseerme.com',
    phone: '0587654567',
    role: 'موظف سحب',
    status: 'نشط',
    bank_name: 'بنك الراجحي',
    IBAN: 'SA028765402159'

  },
  {
    id: 2,
    identified_num: 'H1-649876',
    name: "احمد حسن",
    email: 'm.islam@tayseerme.com',
    phone: '0587654567',
    role: 'موظف سحب',
    status: 'نشط',
    bank_name: 'بنك الراجحي',
    IBAN: 'SA028765402159'

  },
  {
    id: 3,
    identified_num: 'H1-649876',
    name: "احمد حسن",
    email: 'm.islam@tayseerme.com',
    phone: '0587654567',
    role: 'موظف سحب',
    status: 'نشط',
    bank_name: 'بنك الراجحي',
    IBAN: 'SA028765402159'

  },
  {
    id: 4,
    identified_num: 'H1-649876',
    name: "احمد حسن",
    email: 'm.islam@tayseerme.com',
    phone: '0587654567',
    role: 'موظف سحب',
    status: 'نشط',
    bank_name: 'بنك الراجحي',
    IBAN: 'SA028765402159'

  },
  {
    id: 5,
    identified_num: 'H1-649876',
    name: "احمد حسن",
    email: 'm.islam@tayseerme.com',
    phone: '0587654567',
    role: 'موظف سحب',
    status: 'نشط',
    bank_name: 'بنك الراجحي',
    IBAN: 'SA028765402159'

  },
  {
    id: 6,
    identified_num: 'H1-649876',
    name: "احمد حسن",
    email: 'm.islam@tayseerme.com',
    phone: '0587654567',
    role: 'موظف سحب',
    status: 'نشط',
    bank_name: 'بنك الراجحي',
    IBAN: 'SA028765402159'

  },
  {
    id: 7,
    identified_num: 'H1-649876',
    name: "احمد حسن",
    email: 'm.islam@tayseerme.com',
    phone: '0587654567',
    role: 'موظف سحب',
    status: 'نشط',
    bank_name: 'بنك الراجحي',
    IBAN: 'SA028765402159'

  },
  {
    id: 8,
    identified_num: 'H1-649876',
    name: "احمد حسن",
    email: 'm.islam@tayseerme.com',
    phone: '0587654567',
    role: 'موظف سحب',
    status: 'نشط',
    bank_name: 'بنك الراجحي',
    IBAN: 'SA028765402159'

  }
]

mock.onGet('/api/datatables/initial-data').reply(() => {
  return [200, data]
})

mock.onGet('/api/datatables/dataEmployees').reply(config => {
  // eslint-disable-next-line object-curly-newline
  const { q = '', perPage = 10, page = 1 } = config
  /* eslint-enable */

  const queryLowered = q.toLowerCase()
  const filteredData = dataEmployees.filter(
    item =>
      /* eslint-disable operator-linebreak, implicit-arrow-linebreak */
      item.identified_num.toLowerCase().includes(queryLowered) ||
      item.name.toLowerCase().includes(queryLowered) ||
      item.email.toLowerCase().includes(queryLowered) ||
      item.phone.toLowerCase().includes(queryLowered) ||
      item.role.toLowerCase().includes(queryLowered) ||
      item.status.toLowerCase().includes(queryLowered) ||
      item.bank_name.toLowerCase().includes(queryLowered) ||
      item.IBAN.toLowerCase().includes(queryLowered)
  )
  /* eslint-enable  */

  return [
    200,
    {
      allData: data,
      invoices: paginateArray(filteredData, perPage, page),
      total: filteredData.length
    }
  ]
})