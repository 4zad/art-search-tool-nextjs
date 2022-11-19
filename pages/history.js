import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { searchHistoryAtom } from '../globals/store';

import { Button, Card, ListGroup, Pagination, Row } from 'react-bootstrap';

import { PER_PAGE } from '../globals/data';

import styles from '../styles/History.module.css';

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
    if (page < parsedHistory.length) {
      setPage((currentValue) => currentValue + 1);
    }
  };

  useEffect(() => {
    /*
    NOTE: no if statement to check 'if (searchHistory.length > 0)' because the page needs to rerun the use effect even if the length of 'searchHistory' becomes 0 in order to have the page refresh automatically upon deletion of the last search history item and show that no more search history items  exist
    */

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
  }, [searchHistory]);

  return (
    <>
      <Row className='gy-4'>
        {parsedHistory.length > 0 ? (
          <ListGroup>
            {parsedHistory[page - 1].map((historyItem, index) => (
              <ListGroup.Item
                key={index}
                className={styles.historyListItem}
                action
                onClick={(e) => historyClicked(e, index)}
              >
                {Object.keys(historyItem).map((key) => (
                  <>
                    <strong>{key}</strong>: {historyItem[key]}&nbsp;&nbsp;&nbsp;
                  </>
                ))}
                <Button
                  className='float-end'
                  variant='outline-info'
                  size='sm'
                  onClick={(e) => removeHistoryClicked(e, index)}
                >
                  &nbsp;&times;&nbsp;
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
        {parsedHistory.length > 1 ? (
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
