import React, { useState, Fragment } from 'react';
import { Loading } from 'components';
import { isInViewport } from 'utils';
import { LoadMoreProps } from 'models';
import { useEventListener } from 'hooks';

const LoadMore: React.FC<LoadMoreProps> = ({
    onElementVisible,
    canLoadMore,
    isLoadingMore
}) => {
    const [debounce, setDebounce] = useState(false);

    useEventListener(window, 'scroll', scrollListener);

    const defaultClasses = 'button button--fixed deco loadMore__button';
    const className = isLoadingMore
        ? `${defaultClasses} loadMore__button--active`
        : defaultClasses;

    return (
        <Fragment>
            {canLoadMore && <div className='loadMore' id='load-more' />}
            <div className={className}>
                <div className='deco__content'>
                    <Loading />
                </div>
            </div>
        </Fragment>
    );

    function scrollListener() {
        setDebounce(false);
        const loadMore = document && document.getElementById('load-more');
        const isElementInViewport = loadMore && isInViewport(loadMore);

        if (!debounce && isElementInViewport) {
            setDebounce(true);
            onElementVisible();
        }
    }
};

export { LoadMore };
