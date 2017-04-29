

import { PropTypes, Component } from 'react';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
import Subheader from 'material-ui/Subheader';
import Card from 'material-ui/Card';
import '../../assets/commonStyles/index.css';
export default class ClipsListSection extends Component {

  componentDidMount() {
    const { user, actions, term } = this.props;

    actions.api.getVideos(term, user);
  }

  render() {
    const { videos } = this.props;

    if (videos && videos.items && videos.items.body && videos.items.body.items) {
      // debugger;
      const arrayOfItems = [];

      videos.items.body.items.forEach((element, index) => {
        const thisItem = (
          <Card
            key={index}
            style={{ width: '90%', margin: '2%' }}
          >
            <header>
              <h5>{(element.snippet.title)}</h5> <i>{(element.snippet.publishedAt)}</i>
            </header>

            <img
              alt={element.snippet.title}
              src={(element.snippet.thumbnails.medium.url)}
              style={{ align: 'center' }}
            />
            <Subheader>{element.snippet.description}</Subheader>
          </Card>
        );

        arrayOfItems.push(thisItem);
      });

      return (
        <Paper style={{ width: '100%', margin: '4%' }}>
          {arrayOfItems}
        </Paper>);
    }


    return (
      <Paper>
        <LinearProgress mode="indeterminate" />
      </Paper>);
  }
}


ClipsListSection.propTypes = {
  actions: PropTypes.object,
  term: PropTypes.string,
  user: PropTypes.object,
  videos: PropTypes.object,
};
