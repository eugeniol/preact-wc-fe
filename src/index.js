import preact from 'preact';
import registerCustomElement from 'preact-custom-element';

const { cloneElement, Component } = preact;

export class Fetch extends Component {
  state = { loading: true };
  cache = {};

  componentDidUpdate({ url }) {
    if (url !== this.props.url) {
      this.componentWillMount();
    }
  }

  get url() {
    throw Error('not implemented');
  }

  get as() {
    return 'json';
  }

  componentWillMount() {
    const as = this.as;
    const url = this.url;
    this.setState({ loading: true });
    (this.cache[url] || (this.cache[url] = fetch(url).then(r => r[as]()))).then(
      data => {
        // eslint-disable-next-line no-console
        console.log(data);

        this.setState({ loading: false, data });
      }
    );
  }
  render(
    {
      children: [child]
    },
    state
  ) {
    return typeof child === 'function'
      ? child(state)
      : cloneElement(child, state);
  }
}

export const Log = ({ data }) => <pre>{JSON.stringify(data, null, 4)}</pre>;

export class OfferRequest extends Fetch {
  get url() {
    const { module } = this.props;
    const merchantId = '5de91eb4007911e8abdebc764e106cf4';
    const payload = {
      session_id: '5de91eb4007911e8abdebc764e106cf4.445459.1546973380',
      page_type: 1,
      p: JSON.stringify(['100-1001']),
      module_view: JSON.stringify(['regular'])
    };

    const args = Object.entries(payload)
      .map(([key, val]) => [key, encodeURIComponent(val)].join('='))
      .join('&');

    const host = 'https://staging.om.ordergroove.com';

    return `${host}/offer/${merchantId}/${module}?${args}`;
  }
}

export const RadioWidget = ({ module }) => (
  <OfferRequest module={module}>
    <Log />
  </OfferRequest>
);

registerCustomElement(RadioWidget, 'og-radio-widget');
