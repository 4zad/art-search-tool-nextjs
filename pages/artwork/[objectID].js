import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Col, Row } from 'react-bootstrap';
import ArtworkCardDetail from '../../components/ArtworkCardDetail';

export default function ObjectID() {
  let router = useRouter();
  let { objectID } = router.query;

  return (
    <>
      <Row>
        <Col>
          <ArtworkCardDetail objectID={objectID} />
        </Col>
      </Row>
    </>
  );
}
