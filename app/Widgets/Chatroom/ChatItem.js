import React, { PropTypes } from 'react';
import { Image, Panel } from 'react-bootstrap';

const month= ['Jan', 'Feb', 'Mar', 'April', 'May', 'June', 'July', 'Aug', 'Sept', 'Nov', 'Dec'];

export default class ChatItem extends React.Component {

  static propTypes = {
    chat: PropTypes.object.isRequired,
    isDashboard: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    isPrevChatId: PropTypes.bool.isRequired,
  }

  getDate = (date) => {
    const d = new Date(date);
    let hours = `0${d.getHours()}`.slice(-2);
    const minutes = `0${d.getMinutes()}`.slice(-2);

    const period = (hours>=12) ? 'pm' : 'am';
    hours = (hours>12) ? (hours-12) : hours;
    hours = (hours==='00') ? 12 : hours;

    const time = `${month[d.getMonth()]} ${d.getDate()} ${d.getFullYear()} ${hours}:${minutes} ${period}`;
    return time;
  }
  style = () => {
    const widthStyle = this.props.isDashboard ? '100%' : '60%';
    return {
      chat: {
        width: widthStyle,
        display: 'flex',
        flexDirection: 'column',
        wordWrap: 'break-word',
        padding: this.props.isDashboard ? '0 15px 0 15px' : 0,
        marginTop: '0px',
        marginBottom: '0px',

      },
      name: {
        width: '100%',
        fontSize: '1em',
      },
      message: {
        width: '100%',
        padding: this.props.isDashboard ? 5 : 0,
      },
    };
  }
  displayChat = () => {
    const time = this.getDate(this.props.chat.time);
    const who = this.props.id.substring(0, 10) === this.props.chat.id.substring(0, 10);
    const id = this.props.id.substring(0, 10) === this.props.chat.id.substring(0, 10) ? 'You' : this.props.chat.id;
    const style = this.style();
    const header = !this.props.isPrevChatId ? (
      <div style={style.name}>
        {id} <span style={{ color: '#AAA' }}>posted on {time}</span>
      </div>
    )
    :
    (
      null
    );
    const panelMarginBot = this.props.isPrevChatId ? (
      '5px'
    )
    :
    (
      '20px'
    );
    return (
      <div style={style.chat}>
        <Panel header={header} bsStyle={who ? 'info': 'success'}>
          <div style={style.message}>{
              this.props.chat.message.substring(0, 8) === 'https://' ? (
                  <a href={this.props.chat.message}>{this.props.chat.message}</a>
              )
              :
              (<span>
                {this.props.chat.message}
              </span>
              )
            } <br />
          </div>
        </Panel>
      </div>
    );
  }
  render() {
    const img = (this.props.isPrevChatId && !this.props.isDashboard) ? (
      <span
        style={{
          height: '40px',
          width: '40px',
          marginRight: '12px',
          marginTop: '0px',
          clip: 'rect(0px,10px,10px,0px)',
        }}
      ></span>
    )
    :
    (
      null
    );
    const ImgDumb = this.props.isDashboard || this.props.isPrevChatId? (
      img
    )
    :
    (
      <Image
        circle
        responsive
        src={
          `https://ecampus.daiict.ac.in/webapp/intranet/StudentPhotos/${this.props.chat.id.trim().substring(0, 9)}.jpg`
        }
        style={{
          height: '40px',
          width: '40px',
          marginRight: '12px',
          marginTop: '0px',
          clip: 'rect(0px,10px,10px,0px)',
        }}
      />
    );

    return (
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginBottom: '0px' }}>
          {ImgDumb}
          {this.displayChat()}
      </div>
   );
  }
}
