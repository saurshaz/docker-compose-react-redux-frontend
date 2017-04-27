

import { PropTypes, Component } from 'react';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
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
            style={{ width: '100%' }}
          >
            <b>{(element.snippet.title)}</b>
            <p>{(element.snippet.publishedAt)}</p>
            <br />
            <p>{(element.snippet.description)}</p>
            <img
              alt={element.snippet.title}
              src={(element.snippet.thumbnails.medium.url)}
            />
          </Card>
        );

        arrayOfItems.push(thisItem);
      });

      return (
        <Paper>
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
  term: PropTypes.String,
  user: PropTypes.object,
  videos: PropTypes.object,
};
