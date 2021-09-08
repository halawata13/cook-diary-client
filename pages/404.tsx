import { getErrorComponent } from '../components/error';

export default function NotFound() {
  return getErrorComponent({ text: 'ページが見つかりません' });
}
