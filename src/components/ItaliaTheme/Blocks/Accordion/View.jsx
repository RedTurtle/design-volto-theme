/**
 * View Accordion block.
 * @module components/ItaliaTheme/Blocks/Accordion/View
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import ViewBlock from './Block/ViewBlock';
import {
  Container,
  Card,
  CardBody,
} from 'design-react-kit/dist/design-react-kit';

/**
 * View Accordion block class.
 * @class View
 * @extends Component
 */
const AccordionView = ({ data, block }) => {
  const [itemOpen, setItemOpen] = useState(-1);
  const toggle = (index) => {
    setItemOpen(index === itemOpen ? -1 : index);
  };
  const id = new Date().getTime();
  return (
    <div className="block accordion">
      <div className="public-ui">
        <div className="full-width section section-muted section-inset-shadow py-5">
          <Container className="px-md-4">
            <Card className="card-bg rounded" noWrapper={false} space tag="div">
              <CardBody tag="div">
                {data.subblocks.map((subblock, index) => (
                  <ViewBlock
                    data={subblock}
                    toggle={() => {
                      return () => toggle(index);
                    }}
                    isOpen={itemOpen === index}
                    key={index}
                    id={id}
                    index={index}
                  />
                ))}
              </CardBody>
            </Card>
          </Container>
        </div>
      </div>
    </div>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
AccordionView.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default AccordionView;
