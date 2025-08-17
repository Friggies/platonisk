import { withGlobalStaticProps } from '../lib/with-global-static-props';
export const getStaticProps = withGlobalStaticProps();

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'snipcart-label': any;
      'snipcart-input': any;
      'snipcart-checkbox': any;
      'address-fields': any;
      payment: any;
    }
  }
}

export default function Snipcart() {
  return (
    <>
      <div id="snipcart-templates">
        <address-fields section="top">
          <div className="snipcart-form__field">
            <snipcart-label for="phone">Telefonnummer</snipcart-label>
            <snipcart-input name="phone"></snipcart-input>
          </div>
        </address-fields>
        <payment section="top">
          <div>
            <p>
              <snipcart-checkbox
                name="handelsbetingelser"
                required
              ></snipcart-checkbox>
              <snipcart-label for="handelsbetingelser">
                Jeg accepterer PLATONISKs handelsbetingelser.
              </snipcart-label>
            </p>
          </div>
        </payment>
      </div>
    </>
  );
}
