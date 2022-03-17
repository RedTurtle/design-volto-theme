import React from 'react';
import PropTypes from 'prop-types';
import { defineMessages, useIntl } from 'react-intl';
import { Container, Row, Col } from 'design-react-kit/dist/design-react-kit';
import { SidebarPortal } from '@plone/volto/components';
import { addAppURL, flattenToAppURL } from '@plone/volto/helpers';
import { TextEditorWidget } from '@italia/components/ItaliaTheme';
import Sidebar from '@italia/components/ItaliaTheme/Blocks/CountDown/Sidebar';
import CountDown from '@italia/components/ItaliaTheme/Blocks/CountDown/CountDown';

const messages = defineMessages({
  text: {
    id: 'Inserisci il testo…',
    defaultMessage: 'Inserisci il testo…',
  },
});

const Edit = (props) => {
  const {
    data,
    block,
    onChangeBlock,
    selected,
    onSelectBlock,
    onAddBlock,
    index,
  } = props;
  const intl = useIntl();

  return (
    <>
      <div className="public-ui">
        <div className="full-width section py-5">
          {data.background?.[0] ? (
            <div
              className="background-image"
              style={{
                backgroundImage: `url(${
                  data.background[0]?.image
                    ? flattenToAppURL(
                        data.background[0]['@id'] + '/@@images/image',
                      )
                    : addAppURL(data.background[0]?.['@id'])
                })`,
              }}
            ></div>
          ) : (
            <div className="background-image"></div>
          )}
          <Container className="px-md-4">
            <Row>
              <Col
                xs={{
                  size: 12,
                  order: data.countDownPosition === 'left' ? 'last' : 'first',
                }}
                lg={{
                  size: 4,
                  order: data.countDownPosition === 'left' ? 'last' : 'first',
                }}
                className="text"
              >
                <TextEditorWidget
                  data={data}
                  fieldName="text"
                  selected={selected}
                  block={block}
                  onChangeBlock={(data) => onChangeBlock(block, data)}
                  placeholder={intl.formatMessage(messages.text)}
                  showToolbar={true}
                  onSelectBlock={onSelectBlock}
                  onAddBlock={onAddBlock}
                  index={index}
                  disableMoveToNearest={true}
                />
              </Col>
              <Col
                xs={{
                  size: 12,
                  order: data.countDownPosition === 'left' ? 'first' : 'last',
                }}
                lg={{
                  size: 8,
                  order: data.countDownPosition === 'left' ? 'first' : 'last',
                }}
                className="countdown"
              >
                <CountDown
                  end={data.endDate}
                  showHours={data.showHours}
                  showMinutes={data.showMinutes}
                  showSeconds={data.showSeconds}
                />
                <TextEditorWidget
                  data={data}
                  fieldName="countdown_text"
                  selected={selected}
                  block={block}
                  onChangeBlock={(data) => onChangeBlock(block, data)}
                  placeholder={intl.formatMessage(messages.text)}
                  showToolbar={true}
                  onSelectBlock={onSelectBlock}
                  onAddBlock={onAddBlock}
                  index={index}
                  disableMoveToNearest={true}
                />
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      <SidebarPortal selected={selected}>
        <Sidebar {...props} />
      </SidebarPortal>
    </>
  );
};

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Edit.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
  id: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  block: PropTypes.string.isRequired,
};

export default Edit;
