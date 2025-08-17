import { NextSeo } from 'next-seo';
import { withGlobalStaticProps } from '../lib/with-global-static-props';
import Section from '../components/global/small/section/Section';
export const getStaticProps = withGlobalStaticProps();

export default function Levering() {
  return (
    <>
      <NextSeo title="Levering" />
      <Section>
        <h1>Levering</h1>
      </Section>
    </>
  );
}
