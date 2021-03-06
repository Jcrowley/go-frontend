'use strict';
import React from 'react';
import { PropTypes as T } from 'prop-types';
import _cloneDeep from 'lodash.clonedeep';
import c from 'classnames';

import { environment } from '../../config';
import {
  FormInput,
  FormRadioGroup,
  FormError
} from '../../components/form-elements/';

export default class SourceEstimation extends React.Component {
  onEstimationChange (idx, e) {
    const { values, onChange } = this.props;
    const newVals = _cloneDeep(values);
    newVals[idx].estimation = e.target.value;
    onChange(newVals);
  }

  onSourceChange (idx, e) {
    const { values, onChange } = this.props;
    const val = e.target.value;
    let newVals = _cloneDeep(values);
    // Ensure vertical exclusivity in the radio button matrix.
    newVals = newVals.map(o => {
      if (o.source === val) o.source = undefined;
      return o;
    });
    newVals[idx].source = val;
    onChange(newVals);
  }

  onAddSource () {
    const { values, onChange } = this.props;
    onChange(values.concat({estimation: undefined, source: undefined}));
  }

  onRemoveSource (idx) {
    const { values, onChange } = this.props;
    const newVals = _cloneDeep(values);
    newVals.splice(idx, 1);
    onChange(newVals);
  }

  render () {
    const {
      label,
      name,
      description,
      values,
      fieldKey,
      errors
    } = this.props;

    return (
      <div className='form__group estimation-row'>
        <div className='form__inner-header'>
          <div className='form__inner-headline'>
            <label className='form__label'>{label}</label>
            <p className='form__description'>{description}</p>
          </div>
        </div>
        <div className='form__inner-body'>
          {values.map((o, idx) => (
            <div key={o.source || idx} className='estimation'>
              <FormInput
                label='Estimation'
                type='text'
                name={`${name}[${idx}][estimation]`}
                id={`${name}-${idx}-estimation`}
                classLabel={c('form__label--nested', {'visually-hidden': idx > 0})}
                classWrapper='estimation__item-field'
                value={o.estimation}
                onChange={this.onEstimationChange.bind(this, idx)} >
                <FormError
                  errors={errors}
                  property={`${fieldKey}[${idx}].estimation`}
                />
              </FormInput>

              <FormRadioGroup
                label='Source'
                name={`${name}[${idx}][source]`}
                options={[
                  {label: 'Red Cross', value: 'red-cross'},
                  {label: 'Government', value: 'government'}
                ]}
                classLabel={c('form__label--nested', {'visually-hidden': idx > 0})}
                classWrapper='estimation__item'
                selectedOption={o.source}
                onChange={this.onSourceChange.bind(this, idx)} />

              <div className='estimation__item estimation__item--actions'>
                {values.length > 1 ? (
                  <button type='button' className='button--remove-source' title='Delete Source' onClick={this.onRemoveSource.bind(this, idx)}>Delete source</button>
                ) : (
                  <button type='button' className='button--add-item button--secondary-light' title='Add new source' onClick={this.onAddSource.bind(this)}>Add another source</button>
                )}
              </div>
            </div>
          ))}

        </div>
      </div>
    );
  }
}

if (environment !== 'production') {
  SourceEstimation.propTypes = {
    label: T.string,
    name: T.string,
    description: T.string,
    values: T.array,
    fieldKey: T.string,
    errors: T.array,
    onChange: T.func
  };
}
