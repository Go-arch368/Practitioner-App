import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { useDispatch } from 'react-redux';
import { resetGroupRepricingType } from '@/redux/groupSlice';
import { resetFacilitiesType } from '../redux/FacilitySlice';
import { AppDispatch } from '../redux/store';

interface ExpandCollapseProps {
  title: string;
  children: React.ReactNode;
  searchPage: string;
}

// Ref interface for external control
export interface ExpandedComponentRef {
  setIsExpanded: (isExpanded: boolean) => void;
}

// Expandable/collapsible component
const ExpandableComponent = forwardRef<ExpandedComponentRef, ExpandCollapseProps>(
  ({ title, children, searchPage }, ref) => {
    const [isExpanded, setIsExpanded] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    // Allow parent to control expansion
    useImperativeHandle(ref, () => ({
      setIsExpanded: (val: boolean) => setIsExpanded(val),
    }));

    // Toggles expansion and runs any relevant reset logic
    const toggleExpand = () => {
      const nextExpanded = !isExpanded;
      setIsExpanded(nextExpanded);

      if (!nextExpanded) {
        switch (searchPage) {
          case 'groupSearch':
            dispatch(resetGroupRepricingType());
            break;
          case 'facilitySearch':
            dispatch(resetFacilitiesType());
            break;
          case 'allSearch':
            // TODO: Populate with resets for Advanced Search fields as needed
            break;
          case 'ceSearch':
            // TODO: Populate with resets for Advanced Search fields as needed
            break;
          case 'practitionerSearch':
            // TODO: Populate with resets for Advanced Search fields as needed
            break;
          default:
            break;
        }
      }
    };

    return (
      <div>
        <div
          style={{
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            marginTop: '1rem',
            fontWeight: 700,
          }}
          onClick={toggleExpand}
        >
          <span>{isExpanded ? '-' : '+'} {title}</span>
        </div>
        {isExpanded && <div>{children}</div>}
      </div>
    );
  }
);

export default ExpandableComponent;
