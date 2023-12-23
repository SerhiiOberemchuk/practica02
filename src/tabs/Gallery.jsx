import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';
import { MyModal } from 'components/MyModal/MyModal';

export class Gallery extends Component {
  state = {
    query: '',
    images: [],
    page: 1,
    isLoading: false,
    error: null,
    isEmpty: false,
    isVisible: false,
    largeUrl: '',
    alt: '',
    showModal: false,
  };

  componentDidUpdate(_, prevState) {
    const { query, page } = this.state;

    if (prevState.query !== query || prevState.page !== page) {
      this.getPhotos(query, page);
    }
  }
  getPhotos = async (query, page) => {
    if (!query) return;
    this.setState({ isLoading: true });
    try {
      const {
        photos,
        total_results,
        per_page,
        page: currentPage,
      } = await ImageService.getImages(query, page);
      if (photos.length === 0) {
        this.setState({ isEmpty: true });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...photos],
        isVisible: currentPage < Math.ceil(total_results / per_page),
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onHandelSubmit = searchQuery => {
    this.setState({
      query: searchQuery,
      page: 1,
      images: [],
      isEmpty: false,
      error: null,
    });
  };
  onLoadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };
  onOpenModal = (largeUrl, alt) => {
    this.setState({ showModal: true, largeUrl, alt });
  };
  onCloseModal = () => {
    this.setState({ showModal: false, largeUrl: '', alt: '' });
  };

  render() {
    const {
      images,
      isLoading,
      isVisible,
      isEmpty,
      error,
      showModal,
      largeUrl,
      alt,
    } = this.state;
    return (
      <>
        <SearchForm onSubmit={this.onHandelSubmit} />
        {isEmpty && (
          <Text textAlign="center">Sorry. There are no images ... 😭</Text>
        )}
        {error && (
          <Text textAlign="center">❌ Something went wrong - {error}</Text>
        )}
        <Grid>
          {images.map(({ id, alt, src, avg_color }) => (
            <GridItem key={id}>
              <CardItem
                color={avg_color}
                onClick={() => this.onOpenModal(src.large, alt)}
              >
                <img src={src.large} alt={alt} />
              </CardItem>
            </GridItem>
          ))}
        </Grid>
        {isVisible && !isLoading && images.length > 0 && (
          <Button onClick={this.onLoadMore}>
            {isLoading ? 'Loading' : 'Load more'}
          </Button>
        )}
        <MyModal
          modalIsOpen={showModal}
          closeModal={this.onCloseModal}
          largeUrl={largeUrl}
          alt={alt}
        />
      </>
    );
  }
}
