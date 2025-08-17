import { NextSeo } from 'next-seo';
import { withGlobalStaticProps } from '../lib/with-global-static-props';
import Section from '../components/global/small/section/Section';
export const getStaticProps = withGlobalStaticProps();

export default function Handelsbetingelser() {
  return (
    <>
      <NextSeo title="Handelsbetingelser" />
      <Section>
        <h1>Handels&shy;betingelser</h1>
      </Section>
    </>
  );
}
