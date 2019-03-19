import { connect } from 'react-redux';
import React from 'react';
import ConferenceCard from './ConferenceCard';
import SearchBar from './SearchBar';
import { fetchConferenceData } from '../redux/actions';

export class ConferenceList extends React.Component {
  componentDidMount() {
    this.props.fetchData();
  }

  render() {
    const filteredList = this.props.conferences.filter(
      item =>
        item.eventName
          .toLowerCase()
          .search(this.props.searchParam.toLowerCase()) !== -1
    );
    console.log(this.props.conferences);
    return (
      <section className=" mw5 mw7-ns center">
        <h1 className="tl">Upcoming Conferences</h1>
        <SearchBar />
        {filteredList &&
          filteredList.map(conference => (
            <ConferenceCard key={conference.id} conferenceData={conference} />
          ))}
      </section>
    );
  }
}

const mapStateToProps = store => {
  return {
    conferences: store.conferences,
    searchParam: store.searchParam
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchData: () => dispatch(fetchConferenceData())
  };
};

const ConnectedConferenceList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConferenceList);

export default ConnectedConferenceList;
