import React from 'react';
import { TitledBox } from '../TitledBox';

export default { title: 'TitledBox' };

export const withContent = () => (
  <TitledBox title={'A box with content'}>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum convallis est, id commodo urna dictum
      eget. Integer aliquam erat et dui vulputate finibus. Vestibulum eros enim, volutpat sed egestas sed, eleifend non
      lectus.
    </p>
  </TitledBox>
);

export const fullWidth = () => (
  <TitledBox title={'A box with content'} fullWidth>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vestibulum convallis est, id commodo urna dictum
      eget. Integer aliquam erat et dui vulputate finibus. Vestibulum eros enim, volutpat sed egestas sed, eleifend non
      lectus.
    </p>
  </TitledBox>
);
