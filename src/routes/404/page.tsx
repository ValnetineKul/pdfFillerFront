import { Button } from '@/design-system';
import { useNavigate } from 'react-router';

import {
  cardClass,
  pageClass,
  shellClass,
  subtitleClass,
  titleClass,
} from '@/ui/styles';

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <main className={pageClass}>
      <div className={shellClass}>
        <section className={cardClass}>
          <h1 className={titleClass}>Страница не найдена</h1>
          <p className={subtitleClass}>
            Такого адреса нет. Проверьте ссылку или вернитесь к заполнению
            анкеты.
          </p>
          <Button variant="solid" onPress={() => navigate('/')}>
            На главную
          </Button>
        </section>
      </div>
    </main>
  );
}
