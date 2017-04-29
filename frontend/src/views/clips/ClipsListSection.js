

import { PropTypes, Component } from 'react';
import Paper from 'material-ui/Paper';
import LinearProgress from 'material-ui/LinearProgress';
import Subheader from 'material-ui/Subheader';
import Card from 'material-ui/Card';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentDelete from 'material-ui/svg-icons/content/remove';
import Tooltip from '../../components/Tooltip';
import '../../assets/commonStyles/index.css';

const BIG_SCREEN_HEIGHT = 400;
const BIG_SCREEN_WIDTH = 579;

const iconStyles = {
  marginRight: 24,
};

export default class ClipsListSection extends Component {


  componentDidMount() {
    const { user, actions, term } = this.props;

    this.state = {
      selectedUrl: 'http://www.youtube.com/embed/N1R6Fyf5V6M',
      modal: false,
      videoStyle: {
        position: 'fixed',
        marginTop: '30%',
        float: 'left',
        marginRight: '50%',
        height: 0,
        width: 0,
      },
    };
    actions.api.getVideos(term, user);
  }

  handleClosePlayer() {
    this.setState({
      modal: false,
    });
  }

  handlePlayMe(element) {
    this.setState({
      selectedUrl: `http://www.youtube.com/embed/${element.id.videoId}`,
      modal: true,
      videoStyle: {
        position: 'fixed',
        marginTop: '65%',
        float: 'left',
        marginRight: '45%',
        height: BIG_SCREEN_HEIGHT || element.snippet.thumbnails.high.height,
        width: BIG_SCREEN_WIDTH || element.snippet.thumbnails.high.width,
      },
    });
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
            <Card onClick={this.handlePlayMe.bind(this, element)}>
              <img
                alt={element.snippet.title}
                src={(element.snippet.thumbnails.medium.url)}
              />
            </Card>
            <Subheader>{element.snippet.description}</Subheader>
          </Card>
        );

        arrayOfItems.push(thisItem);
      });

      return (
        <Paper style={{ width: '100%', margin: '4%' }} >
          <div style={this.state.videoStyle}>
            <section style={{ display: ((this.state.modal === true) ? 'block' : 'none') }}>
              <iframe
                src={this.state.selectedUrl}
              />
              <Tooltip
                label="Close"
              >
                <FloatingActionButton
                  style={iconStyles}
                  onClick={this.handleClosePlayer.bind(this)}
                >
                  <ContentDelete />
                </FloatingActionButton>
              </Tooltip>
            </section>
          </div>

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
