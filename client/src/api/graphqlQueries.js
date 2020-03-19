import { gql } from "apollo-boost";

export const GET_TV_SHOWS = gql`
  query TvShows($email: String!) {
    user(email: $email) {
      tv_shows {
        id
        name
        genre
        date_started
        time_watching
      }
    }
  }
`;

export const ADD_TV_SHOW = gql`
  mutation addNewTvShow(
    $name: String!
    $dateStarted: String!
    $genre: String!
    $time: String!
  ) {
    newTvShow(
      name: $name
      date_started: $dateStarted
      genre: $genre
      time_watching: $time
    ) {
      id
      name
      genre
      date_started
      date_finished
      time_watching
    }
  }
`;
