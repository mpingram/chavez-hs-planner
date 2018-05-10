import * as React from "react";

import { StudentLocation } from "shared/types";

import Timeout from "shared/util/timeout";
import TextField from "shared/components/ui/fields/text-field";
import FieldValidationState from "shared/components/ui/fields/field-validation-state";
import { getTierAndGeo, GetTierError } from "shared/util/get-tier-and-geo";

import "./address-tier-calculator.scss";

interface AddrTierCalcProps {
  location: StudentLocation
  onLocationChange: (loc: StudentLocation) => any
}

interface AddrTierCalcState {
  address: string
  tier: string
  geo: {latitude: number, longitude: number}
  request?: Promise<string> 
  timeoutInstance?: Timeout | null
  requestInProgress: boolean
  addressValidationState: FieldValidationState
  errMsg: string | null
}

export class AddressTierCalculator extends React.Component<AddrTierCalcProps, AddrTierCalcState> {

  constructor(props){
    super(props);
    this.state = {
      address: props.address ? props.address : "",
      tier: props.tier ? props.tier : "",
      geo: props.geolocation ? props.geolocation : {latitude: 0, longitude: 0},
      timeoutInstance: null,
      requestInProgress: false,
      addressValidationState: FieldValidationState.NEUTRAL,
      errMsg: null
    };
  } 

  private now(): number {
    return new Date().valueOf();
  }

  private setRequestInProgress = (isInProgress: boolean) => {
    if (isInProgress !== this.state.requestInProgress) {
      this.setState({
        requestInProgress: isInProgress
      });
    }
  }

  private handleAddressChange = (streetAddress: string): void => {
    const TIMEOUT_DELAY = 1000; // ms

    // append Chicago to end of all addresses
    const fullAddress = streetAddress + ", Chicago, IL";

    this.setState({
      address: streetAddress,
      addressValidationState: FieldValidationState.NEUTRAL,
      tier: null
    });

    const validate = (addr: string) => {
      return addr && addr.length > 5;
    };

    // after a timeout (to make sure that we don't send a ton of requests)
    // send a request for the tier
    const newTimeout = new Timeout( () => {

      // signal that request is in progress
      this.setRequestInProgress(true);

      // if address passes basic validation
      if (validate(fullAddress)) {
        getTierAndGeo(fullAddress).then( ({tier, geo}) => {
          this.setState({
            tier: tier,
            geo: geo,
            addressValidationState: FieldValidationState.SUCCESS
          });
          this.setRequestInProgress(false);
          this.props.onLocationChange({
            address: streetAddress,
            tier: tier,
            geo: geo
          });
        }).catch( err => {
          if (err === GetTierError.InvalidAddressErr) {
            this.setState({
              addressValidationState: FieldValidationState.FAILURE,
              errMsg: "No address found!"
            });
            this.setRequestInProgress(false);
          } else if (err === GetTierError.NoTierFoundErr) {
            this.setState({
              addressValidationState: FieldValidationState.WARNING,
              errMsg: "No CPS Tier found for this address."
            });
            this.setRequestInProgress(false);
          } else if (err === GetTierError.RequestFailedErr) {
            this.setState({
              addressValidationState: FieldValidationState.WARNING,
              errMsg: "Connection error. Try again!"
            });
            this.setRequestInProgress(false);
          }
        });
      }
    }, TIMEOUT_DELAY);

    if (this.state.timeoutInstance !== null) {
      this.state.timeoutInstance.cancel();
    }

    newTimeout.start();
    this.setState({
      timeoutInstance: newTimeout 
    });
  }

  render() {
    return <div className="address-tier-calculator">
      <TextField
        label="Your street address"
        value={this.state.address ? this.state.address : "" }
        validator={ () => this.state.addressValidationState }
        onChange={this.handleAddressChange}
      />
      <div className="address-suffix">
      , Chicago, IL
      </div>
      <div className="tier-display-container">
        <div className="tier-display-label">
          Your CPS Tier
        </div>
        <div className="tier-display">
          { this.state.requestInProgress 
                ? <div className="spinning-load-icon"></div>
                : (this.state.tier ? this.state.tier : "n/a")
          }
        </div>
      </div>
      <div className={`tier-calc-error-display ${this.state.errMsg ? "" : "no-err"}` }>
        {this.state.errMsg}
      </div>
    </div>
  }
}
