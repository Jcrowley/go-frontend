'use strict';
import React from 'react';
import { connect } from 'react-redux';
import { PropTypes as T } from 'prop-types';
import _set from 'lodash.set';
import _cloneDeep from 'lodash.clonedeep';

import { environment } from '../config';

import App from './app';
import Fold from '../components/fold';
import {
  FormInput,
  FormTextarea,
  FormRadioGroup,
  FormCheckbox,
  FormSelect
} from '../components/form-elements/';
import { FormDescription } from '../components/form-elements/misc';

const formData = {
  status: [
    {
      label: 'Early Warning',
      value: 'early-warning',
      description: 'Early warning message for an upcoming disaster.'
    },
    {
      label: 'Event',
      value: 'event',
      description: 'First report for this disaster.'
    }
  ],

  sources: [
    {
      label: 'National Society',
      name: 'national-society'
    },
    {
      label: 'Government',
      name: 'government'
    },
    {
      label: 'Delegation/Secretariat',
      name: 'delegation-secretariat'
    },
    {
      label: 'UN agency',
      name: 'un-agency'
    },
    {
      label: 'Academia/Research',
      name: 'academia-research'
    },
    {
      label: 'Press',
      name: 'press'
    },
    {
      label: 'NGOs',
      name: 'ngo'
    },
    {
      label: 'Other',
      name: 'other'
    }
  ],

  // Step 3
  actions: [
    {
      label: 'Damage/Needs Assessment',
      name: 'damage-needs'
    },
    {
      label: 'Health',
      name: 'health'
    },
    {
      label: 'Camp Mangement',
      name: 'camp-management'
    },
    {
      label: 'Search and Rescue',
      name: 'search-rescue'
    },
    {
      label: 'Tracing/RFP',
      name: 'tracing'
    },
    {
      label: 'Psychosocial support services',
      name: 'psychosocial'
    },
    {
      label: 'Water and Sanitation',
      name: 'water-sanitation'
    },
    {
      label: 'Shelter',
      name: 'shelter'
    },
    {
      label: 'Evacuation',
      name: 'evacuation'
    },
    {
      label: 'First Aid',
      name: 'first-aid'
    },
    {
      label: 'Relief/Supply Distribution',
      name: 'relief'
    },
    {
      label: 'Human remains management and identification',
      name: 'human remains'
    }
  ]
};

class FieldReportForm extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      step: 3,
      data: {
        summary: undefined,
        status: undefined,
        disasterType: undefined,
        event: undefined,
        sources: formData.sources.map(o => ({
          name: o.name,
          checked: false,
          specification: undefined
        })),
        description: undefined,
        assistance: undefined,

        // Step 3
        bulletin: undefined,
        actionsOthers: undefined,
        actionsNatSoc: {
          options: formData.actions.map(o => ({
            name: o.name,
            checked: false
          })),
          description: undefined
        },
        actionsPns: {
          options: formData.actions.map(o => ({
            name: o.name,
            checked: false
          })),
          description: undefined
        },
        actionsFederation: {
          options: formData.actions.map(o => ({
            name: o.name,
            checked: false
          })),
          description: undefined
        }
      },
      errors: []
    };

    this.onSubmit = this.onSubmit.bind(this);
  }

  onSubmit () {
  }

  onFieldChange (field, e) {
    let data = _cloneDeep(this.state.data);
    let val = e.target ? e.target.value : e;
    _set(data, field, val === '' ? undefined : val);
    this.setState({data});
  }

  renderStep1 () {
    return (
      <Fold title='Basic Information'>
        <form className='form' onSubmit={this.onSubmit}>
          <FormInput
            label='Summary'
            type='text'
            name='summary'
            id='summary'
            description={<p className='form__description'>Write a short summary of the report's topic. It will be used as the subject of the e-mail notification,
            later as the tittle of the RSS feed and possibly as the text message on mobile phones.<br /><em>Example: 250 dead after an earthquake in Indonesia</em></p>}
            value={this.state.data.summary}
            onChange={this.onFieldChange.bind(this, 'summary')}
            autoFocus
          />

          <FormRadioGroup
            label='Status'
            name='status'
            options={formData.status}
            selectedOption={this.state.data.status}
            onChange={this.onFieldChange.bind(this, 'status')} />

          <div className='form__hascol form__hascol--2'>
            <FormSelect
              label='Disaster Type'
              name='disaster-type'
              id='disaster-type'
              options={[
                {
                  value: '--',
                  label: '-- Select one --'
                },
                {
                  value: 'hurricane',
                  label: 'Hurricane'
                },
                {
                  value: 'typhoon',
                  label: 'Typhoon'
                }
              ]}
              value={this.state.data.disasterType}
              onChange={this.onFieldChange.bind(this, 'disasterType')} />

            <FormSelect
              label='Event'
              name='event'
              id='event'
              options={[
                {
                  value: '--',
                  label: '-- Select one --'
                },
                {
                  value: 'event1',
                  label: 'Event One'
                },
                {
                  value: 'event2',
                  label: 'Event Two'
                }
              ]}
              value={this.state.data.event}
              onChange={this.onFieldChange.bind(this, 'event')} />
          </div>

          <div className='form__group'>
            <label className='form__label'>Sources</label>
            <div className="form__description">
              <p>Check the box next to the source of information and specify:</p>
              <ul>
                <li>UN agency - OCHA</li>
                <li>Academia/Research - Tropical Storm Risk</li>
              </ul>
            </div>
            <div className='sources-list'>
              {formData.sources.map((source, idx) => (
                <ReportSource
                  key={source.name}
                  idx={idx}
                  label={source.label}
                  sourceName={source.name}
                  specificationValue={this.state.data.sources[idx].specification}
                  checked={this.state.data.sources[idx].checked}
                  onChange={this.onFieldChange.bind(this, `sources[${idx}]`)} />
              ))}
            </div>
          </div>

          <FormTextarea
            label='Brief Description of the Situation'
            name='description'
            id='description'
            description={'Briefly describe the situation.'}
            value={this.state.data.description}
            onChange={this.onFieldChange.bind(this, 'description')} />

          <FormRadioGroup
            label='Government requests international assistance?'
            description={'Indicate if the government requested international assistance.'}
            name='assistance'
            options={[
              {
                label: 'Yes',
                value: 'true'
              },
              {
                label: 'No',
                value: 'false'
              }
            ]}
            selectedOption={this.state.data.assistance}
            onChange={this.onFieldChange.bind(this, 'assistance')} />
        </form>
      </Fold>
    );
  }

  renderStep2 () {
    return (
      <Fold title='Numeric Details (People)'>
        <form className='form' onSubmit={this.onSubmit}>
        </form>
      </Fold>
    );
  }

  renderStep3 () {
    return (
      <Fold title='Actions taken'>
        <form className='form' onSubmit={this.onSubmit}>
          <ActionsCheckboxes
            label='Actions Taken by National Society Red Cross (if any)'
            description={'Select the activities taken by the National Society and briefly describe'}
            name='actions-nat-soc'
            options={formData.actions}
            values={this.state.data.actionsNatSoc}
            onChange={this.onFieldChange.bind(this, 'actionsNatSoc')} />

          <ActionsCheckboxes
            label='Actions Taken by PNS Red Cross (if any)'
            description={'Select the activities taken by the foreign National Society and briefly describe'}
            name='actions-pns'
            options={formData.actions}
            values={this.state.data.actionsPns}
            onChange={this.onFieldChange.bind(this, 'actionsPns')} />

          <ActionsCheckboxes
            label='Actions Taken by Federation Red Cross (if any)'
            description={'Select the activities taken by the Federation (could be the Zone office, DMUS, ...) and briefly describe'}
            name='actions-federation'
            options={formData.actions}
            values={this.state.data.actionsFederation}
            onChange={this.onFieldChange.bind(this, 'actionsFederation')} />

          <FormRadioGroup
            label='Information Bulletin'
            description={'About information management, indicate if an Information Bulletin was published, is planned or if no Information Bulletin will be issued for this operation/disaster.'}
            name='bulletin'
            options={[
              {
                label: 'No',
                value: 'no'
              },
              {
                label: 'Planned',
                value: 'planned'
              },
              {
                label: 'Yes/Published',
                value: 'published'
              }
            ]}
            selectedOption={this.state.data.bulletin}
            onChange={this.onFieldChange.bind(this, 'bulletin')} />

          <FormTextarea
            label='Actions Taken by Others (Governemnts, UN)'
            name='actions-others'
            id='actions-others'
            description={'Who else was involved? UN agencies? NGOs? Government? Describe what other actors did.'}
            value={this.state.data.actionsOthers}
            onChange={this.onFieldChange.bind(this, 'actionsOthers')} />
        </form>
      </Fold>
    );
  }

  render () {
    return (
      <App className='page--frep-form'>
        <section className='inpage'>
          <header className='inpage__header'>
            <div className='inner'>
              <div className='inpage__headline'>
                <h1 className='inpage__title'>Create Field Report</h1>
              </div>
            </div>
          </header>
          <div className='inpage__body'>
            <div className='inner'>
              {this[`renderStep${this.state.step}`]()}
            </div>
          </div>
        </section>
      </App>
    );
  }
}

if (environment !== 'production') {
  FieldReportForm.propTypes = {
  };
}

// /////////////////////////////////////////////////////////////////// //
// Connect functions

const selector = (state) => ({
});

const dispatcher = (dispatch) => ({
});

export default connect(selector, dispatcher)(FieldReportForm);

//
//
// React elements specific for this form
//
//

class ReportSource extends React.Component {
  constructor (props) {
    super(props);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.onSpecificationChange = this.onSpecificationChange.bind(this);
  }

  onCheckChange (e) {
    const { sourceName, checked, onChange, specificationValue } = this.props;

    onChange({
      name: sourceName,
      checked: !checked,
      specification: specificationValue
    });
  }

  onSpecificationChange (e) {
    const { sourceName, checked, onChange } = this.props;

    onChange({
      name: sourceName,
      checked: checked,
      specification: e.target.value
    });
  }

  render () {
    const {
      idx,
      label,
      sourceName,
      specificationValue,
      checked
    } = this.props;

    return (
      <div className='sources-list__item'>
        <FormCheckbox
          label={label}
          name={`source[${idx || 0}][name]`}
          id={`source-name-${sourceName}`}
          value={sourceName}
          checked={checked}
          onChange={this.onCheckChange} />

        <FormInput
          label='Specification'
          type='text'
          name={`source[${idx || 0}][spec]`}
          id='source-spec'
          value={specificationValue}
          disabled={!checked}
          onChange={this.onSpecificationChange} />
      </div>
    );
  }
}

if (environment !== 'production') {
  ReportSource.propTypes = {
    idx: T.number,
    label: T.string,
    sourceName: T.string,
    specificationValue: T.string,
    value: T.string,
    checked: T.bool,
    onChange: T.func
  };
}

class ActionsCheckboxes extends React.Component {
  constructor (props) {
    super(props);
    this.onDescriptionChange = this.onDescriptionChange.bind(this);
  }

  onCheckChange (idx) {
    const { values, onChange } = this.props;
    const prevState = values.options[idx].checked;
    let newVals = _cloneDeep(values);
    _set(newVals, `options[${idx}].checked`, !prevState);

    onChange(newVals);
  }

  onDescriptionChange (e) {
    const { values, onChange } = this.props;
    const newVals = Object.assign({}, values, {description: e.target.value});
    onChange(newVals);
  }

  render () {
    const {
      label,
      name,
      description,
      options,
      values
    } = this.props;

    return (
      <div className='form__group'>
        <label className='form__label'>{label}</label>
        <FormDescription value={description} />
        {options.map((o, idx) => (
          <FormCheckbox
            key={o.name}
            label={o.label}
            name={`${name}[options][]`}
            id={`${name}-${o.name}`}
            value={o.name}
            checked={values.options[idx].checked}
            onChange={this.onCheckChange.bind(this, idx)} />
        ))}

        <FormTextarea
          label='Description'
          name={`${name}[description]`}
          id={`${name}-description`}
          value={values.description}
          onChange={this.onDescriptionChange} />
      </div>
    );
  }
}

if (environment !== 'production') {
  ActionsCheckboxes.propTypes = {
    label: T.string,
    name: T.string,
    description: T.string,
    options: T.array,
    values: T.shape({
      options: T.array,
      description: T.string
    }),
    onChange: T.func
  };
}
