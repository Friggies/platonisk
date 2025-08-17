import { NextSeo } from 'next-seo';
import { withGlobalStaticProps } from '../lib/with-global-static-props';
import Section from '../components/global/small/section/Section';
export const getStaticProps = withGlobalStaticProps();

export default function Kontakt() {
  return (
    <>
      <NextSeo title="Kontakt" />
      <Section>
        <h1>Kontakt</h1>
      </Section>
    </>
  );
}
