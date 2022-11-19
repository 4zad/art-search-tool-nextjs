import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../globals/store';

import { Button, Card, Col, ListGroup, Pagination, Row } from 'react-bootstrap';

import { PER_PAGE } from '../globals/data';

export default function History() {
  const router = useRouter();
  const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom); // holds IDs of all search queries made
  const [page, setPage] = useState(1); // holds current page number
  const [parsedHistory, setParsedHistory] = useState([]); // holds 2D array of values where each index in the outer array is a page and each index in the inner array is a 'parsed' search query object

  const historyClicked = (e, index) => {
    router.push(`/artwork?${searchHistory[index]}`);
  };

  const removeHistoryClicked = (e, index) => {
    e.stopPropagation(); // stop the event from trigging other events

    setSearchHistory((current) => {
      let history = [...current];
      history.splice(index, 1);

      return history;
    });
  };

  const previousPage = () => {
    if (page > 1) {
      setPage((currentValue) => currentValue - 1);
    }
  };

  const nextPage = () => {
    if (page < parsedHistory.length || !(data.length < PER_PAGE)) {
      setPage((currentValue) => currentValue + 1);
    }
  };

  useEffect(() => {
    if (searchHistory.length > 0) {
      // splitting the 'searchHistory' into separate arrays of length of items on each page, 'PER_PAGE'
      let results = [],
        searchHistoryObjects = [];

      searchHistory.forEach((h) => {
        let params = new URLSearchParams(h);
        let entries = params.entries();
        searchHistoryObjects.push(Object.fromEntries(entries));
      });

      for (let i = 0; i < searchHistoryObjects.length; i += PER_PAGE) {
        const chunk = searchHistoryObjects.slice(i, i + PER_PAGE);
        results.push(chunk);
      }

      setParsedHistory(results);
      setPage(1);
    }
  }, [searchHistory]);

  return (
    <>
      <Row className='gy-4'>
        {parsedHistory.length > 0 ? (
          <ListGroup>
            {parsedHistory[page - 1].map((historyItem, index) => (
              <ListGroup.Item key={index} action onClick={(e) => historyClicked(e, index)}>
                {Object.keys(historyItem).map((key) => (
                  <>
                    {key}: <strong>{historyItem[key]}</strong>&nbsp;
                  </>
                ))}
                <Button
                  className='float-end'
                  variant='outline-info'
                  size='sm'
                  onClick={(e) => removeHistoryClicked(e, index)}
                >
                  &times;
                </Button>
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <Card>
            <Card.Body>
              <h4>There is nothing here yet...</h4>
              <p>Try searching for something and coming back.</p>
            </Card.Body>
          </Card>
        )}
      </Row>

      <Row className='gy-4'>
        {artworkList.length > 0 ? (
          <Pagination /*size='lg'*/>
            <Pagination.Prev onClick={() => previousPage()} />
            <Pagination.Item active>{page}</Pagination.Item>
            <Pagination.Next onClick={() => nextPage()} />
          </Pagination>
        ) : null}
      </Row>
    </>
  );
}