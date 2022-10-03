import basedayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

basedayjs.extend(isToday);
basedayjs.extend(utc);
basedayjs.extend(timezone);
basedayjs.tz.setDefault('Asia/Jakarta');

const dayjs = basedayjs;
export default dayjs;
