import * as React from "react";
import { Button, ButtonType } from "office-ui-fabric-react";
import Header from "./Header";
import HeroList, { HeroListItem } from "./HeroList";
import Progress from "./Progress";
import config from '../config';
import './styles.css';
/* global Button, Header, HeroList, HeroListItem, Progress */

export default class App extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      fahrenheit: 0
    };
  }

  componentDidMount() {
    this.getTemperature();
  }

  getTemperature() {
    const __this = this;
    const url = `https://api.openweathermap.org/data/2.5/weather?id=4254010&APPID=${config.get('openwopenweathermap_api_key')}`
    fetch(url)
      .then((resp) => resp.json())
      .then(data => {
        const { main } = data;
        if (main && main.temp) {
          const fahrenheit = parseFloat(main.temp * 9 / 5 - 459.67).toFixed(2)
          __this.setState({ fahrenheit });
        }
      })
      .catch(err => {
        alert(err.message);
      })
  }

  click = async () => {
    /**
     * Insert your Outlook code here
     */
  };

  render() {
    const { title, isOfficeInitialized } = this.props;

    if (!isOfficeInitialized) {
      return (
        <Progress title={title} logo="assets/logo-filled.png" message="Please sideload your addin to see app body." />
      );
    }

    const { fahrenheit } = this.state;    

    return (
      <div className="ms-welcome">
        {/* <Header logo="assets/logo-filled.png" title={this.props.title} message="Welcome" />
        <HeroList message="Discover what Office Add-ins can do for you today!" items={this.state.listItems}>
          <p className="ms-font-l">
            Modify the source files, then click <b>Run</b>.
          </p>
          <Button
            className="ms-welcome__action"
            buttonType={ButtonType.hero}
            iconProps={{ iconName: "ChevronRight" }}
            onClick={this.click}
          >
            Run
          </Button>
        </HeroList> */}

        <div className="content">
          {fahrenheit}&#8457;
        </div>
      </div>
    );
  }
}
