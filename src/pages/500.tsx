import { NextSeo } from 'next-seo';
import Section from '../components/global/small/section/Section';

export default function Custom500() {
  return (
    <>
      <NextSeo
        title="Der er opstået et problem"
        noindex={true}
        nofollow={true}
      />
      <Section>
        <h1>500 - Der er opstået et problem</h1>
        <p>Der er sket en fejl. Prøv venligst igen senere.</p>
      </Section>
    </>
  );
}
