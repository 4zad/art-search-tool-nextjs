import { useRouter } from 'next/router';

import { Col, Row } from 'react-bootstrap';
import ArtworkCardDetail from '../../components/ArtworkCardDetail';

export default function ObjectID() {
  const router = useRouter();

  return (
    <>
      <Row>
        <Col>
          <ArtworkCardDetail objectID={router.query} />
        </Col>
      </Row>
    </>
  );
}
