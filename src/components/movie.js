import React, { Component }  from 'react';
import {connect} from "react-redux";
import { Glyphicon, Panel, ListGroup, ListGroupItem, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {fetchMovie} from "../actions/movieActions";
import {writeReview} from '../actions/movieActions'
//support routing by creating a new component

class Movie extends Component {
    componentDidMount() {
    }
    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        const { dispatch } = this.props;
        dispatch(fetchMovie(this.props.movieId));
        this.submitReview = this.submitReview.bind(this);
        this.state = {
            details: {
                MovieId: this.props.movieId,
                Quote: '',
                Rating: 0
            }
        }
    }
    submitReview() {
        const { dispatch } = this.props;
        dispatch(writeReview(this.state.details.MovieId, this.state.details.Quote, this.state.details.Rating));
    }
    updateDetails(event) {
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }
    render() {
        const ActorInfo = ({ actors }) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.ActorName}</b> {actor.CharacterName}
                </p>
            );
        };

        const ReviewInfo = ({ reviews }) => {
            if (!reviews) {
                return <div>Loading...</div>;
            }
            return reviews.map((review, i) =>
                <p key={i}>
                <b>{review.Name}</b> {review.Quote}
                    <Glyphicon glyph={'star'} /> {review.Rating}
                </p>
            );
        }
        console.log('this.props.average is ' + this.props.average)
        var currentMovie = this.props.selectedMovie
        if (!currentMovie)
            return <div>Loading...</div>
        return (
            <Panel>
                <Panel.Heading>Movie Detail</Panel.Heading>
                <Panel.Body><Image className="image" src={currentMovie.Image} thumbnail /></Panel.Body>
                <ListGroup>
                    <ListGroupItem>{currentMovie.Title}</ListGroupItem>
                    <ListGroupItem><ActorInfo actors={currentMovie.Actors} /></ListGroupItem>
                    <ListGroupItem><h4><Glyphicon glyph={'star'} />{currentMovie.average}</h4></ListGroupItem>
                </ListGroup>
                <ListGroup>
                    <Panel.Body>
                        <Form horizontal>
                            <FormGroup controlId="Quote">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Review
                        </Col>
                                <FormControl onChange={this.updateDetails} value={this.state.details.Quote} type="text" placeholder="Write a review." />
                            </FormGroup>

                            <FormGroup controlId="Rating">
                                <Col componentClass={ControlLabel} sm={2}>
                                    Rating
                        </Col>
                                <FormControl onChange={this.updateDetails} value={this.state.details.Rating} type="int" placeholder="Rating" />
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button onClick={this.submitReview}>Submit Review</Button>
                                </Col>
                            </FormGroup>
                        </Form></Panel.Body>
                </ListGroup>
                <Panel.Body><ReviewInfo reviews={currentMovie.reviews} /></Panel.Body>
            </Panel>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selectedMovie: state.movie.selectedMovie,
        movieId: ownProps.match.params.movieId,
    }
}

export default withRouter(connect(mapStateToProps)(Movie));

/*
import React, { Component }  from 'react';
import {connect} from "react-redux";
import { Glyphicon, Panel, ListGroup, ListGroupItem, Col, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap'
import { Image } from 'react-bootstrap'
import { withRouter } from "react-router-dom";
import {fetchMovie} from "../actions/movieActions";

//support routing by creating a new component

class Movie extends Component {
    componentDidMount() {
    }
    constructor(props) {
        super(props);
        this.updateDetails = this.updateDetails.bind(this);
        const { dispatch } = this.props;
        dispatch(fetchMovie(this.props.movieId, props.selectedMovie.average));
        this.state = {
            details: {
                Quote: '',
                Rating: 0
            }
        }
    }
    updateDetails(event) {
        let updateDetails = Object.assign({}, this.state.details);

        updateDetails[event.target.id] = event.target.value;
        this.setState({
            details: updateDetails
        });
    }
    render() {
        const ActorInfo = ({ actors }) => {
            return actors.map((actor, i) =>
                <p key={i}>
                    <b>{actor.ActorName}</b> {actor.CharacterName}
                </p>
            );
        };

        const ReviewInfo = ({ reviews }) => {
            if (!reviews) {
                return <div>Loading...</div>;
            }
            return reviews.map((review, i) =>
                <p key={i}>
                <b>{review.Name}</b> {review.Quote}
                    <Glyphicon glyph={'star'} /> {review.Rating}
                </p>
            );
        }

        const AddReview = ({ currentMovie }) => {
            return (
                <Form horizontal>
                    <FormGroup controlId="Quote">
                        <Col componentClass={ControlLabel} sm={2}>
                            Review
                        </Col>
                            <FormControl onChange={this.updateDetails} value={this.state.details.Quote} type="text" placeholder="Write a review." />
                    </FormGroup>

                    <FormGroup controlId="Rating">
                        <Col componentClass={ControlLabel} sm={2}>
                            Rating
                        </Col>
                            <FormControl onChange={this.updateDetails} value={this.state.details.Rating} type="int" placeholder="Rating" />
                    </FormGroup>

                    <FormGroup>
                        <Col smOffset={2} sm={10}>
                            <Button onClick={this.submitReview}>Submit Review</Button>
                        </Col>
                    </FormGroup>
                </Form>
            )
        }

        const DetailInfo = ({currentMovie}) => {
            if (!currentMovie) { // evaluates to true if currentMovie is null
                return <div>Loading...</div>;
            }
            return (
                <Panel>
                    <Panel.Heading>Movie Detail</Panel.Heading>
                    <Panel.Body><Image className="image" src={currentMovie.Image} thumbnail /></Panel.Body>
                    <ListGroup>
                        <ListGroupItem>{currentMovie.Title}</ListGroupItem>
                        <ListGroupItem><ActorInfo actors={currentMovie.Actors} /></ListGroupItem>
                        <ListGroupItem><h4><Glyphicon glyph={'star'} />{this.props.average}</h4></ListGroupItem>
                    </ListGroup>
                    <ListGroup>
                        <Panel.Body><AddReview submitReview={currentMovie._id} /></Panel.Body>
                    </ListGroup>
                    <Panel.Body><ReviewInfo reviews={currentMovie.reviews} /></Panel.Body>
                </Panel>
            );
        };
        console.log('this.props.average is ' + this.props.average)
        return (
            <DetailInfo currentMovie={this.props.selectedMovie} />
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        selectedMovie: state.movie.selectedMovie,
        movieId: ownProps.match.params.movieId,
        average: state.movie.selectedMovie.average
    }
}

export default withRouter(connect(mapStateToProps)(Movie));
*/