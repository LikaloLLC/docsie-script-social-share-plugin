import { Component } from "inferno";
import { autobind } from "decorators";
import { Route } from "utils";
import { Icon } from "./Icon";

export class ComprehensiveView extends Component {
    render() {
        const {
            viewOptionsData
          } = this.props;
        return <div id="comprehensive-view-plugin-container" className="comprehensive-view-plugin-container">
            {viewOptionsData.map((field, i) => {
                 switch (field.link) {
                     case "true": return <a href={field.href}>{field.label}</a>
                     case "false": return <button>{field.label}</button>
                 }
            })
            }
            <div role="presentation" id="presentation" class="pure-notification-progress"></div>
        </div>
    }
}
// style="animation-duration: 6000ms;"