import { Component } from 'react';

import * as ImageService from 'service/image-service';
import { Button, SearchForm, Grid, GridItem, Text, CardItem } from 'components';

export class Gallery extends Component {
  state = { query: '' };
  onHandelSubmit = searchQuery => {
    this.setState({ query: searchQuery });
  };

  render() {
    return (
      <>
        <SearchForm onSubmit={this.onHandelSubmit} />
        <Text textAlign="center">Sorry. There are no images ... 😭</Text>
      </>
    );
  }
}
