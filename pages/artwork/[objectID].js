import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { Col, Row } from 'react-bootstrap';
import ArtworkCardDetail from '../../components/ArtworkCardDetail';

export default function ObjectID() {
  let router = useRouter();
  let objID;

  useEffect(() => {
    if (!router.isReady) return;

    // codes using router.query
    let { id } = router.query;
    objID = id;
  }, [router.isReady]);

  return (
    <>
      <Row>
        <Col>
          <ArtworkCardDetail objectID={objID} />
        </Col>
      </Row>
    </>
  );
}
