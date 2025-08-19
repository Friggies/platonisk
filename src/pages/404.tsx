import { NextSeo } from 'next-seo';
import Section from '../components/global/small/section/Section';

export default function Custom404() {
  return (
    <>
      <NextSeo title="Side ikke fundet" noindex={true} nofollow={true} />
      <Section>
        <h1>404 - Side ikke fundet</h1>
        <p>Siden du leder efter findes ikke.</p>
      </Section>
    </>
  );
}
