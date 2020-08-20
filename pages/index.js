import Head from 'next/head';
import React, { Component } from 'react';
import styles from '../styles/Home.module.css';
import Header from '../components/header';
import Card from '../components/cards';
import { Container, Row } from 'react-bootstrap';
// import {GetStaticProps} from 'next';

class Home extends Component {
	constructor(props) {
		super(props);

		this.data = this.props.result.slice();

		this.state = {
			data: [],
			text0: 'The basics for private and secure communications',
			text1: 'Full-featured mailbox with advanced protection',
			text2: 'ProtonMail for professionals and businesses',
			text3: 'ProtonMail for families and small businesses',
			storage0: '500 MB storage',
			storage1: '5 GB storage',
			storage2: '5 GB storage per user',
			storage3: '20 GB storage',
			additional1: 'Supports folders, labels, filters, auto-replay, IMAP/SMTP and more',
			additional2: 'Catch all email, multi user management, priority support and more',
			additional3: 'Includes all features',
			vpn0: 'ProtonVPN (optional)',
			vpn1: 'ProtonVPN (optional)',
			vpn2: 'ProtonVPN (optional)',
			vpn3: 'Includes ProtonVPN',
			pricing: [ 5, 8, 30 ],
			currency: '\u20AC',
			time: 'per month'
		};
	}

	componentDidMount() {
		this.setState({
			data: this.data.filter((el, i) => i == 0 || i == 2 || i == 5)
		});
	}

	// Function onChange handler for select by category "time period"
	onPeriodChange = (e) => {
		let newArr = [];
		if (e.target.value === 'monthly') {
			this.state.data.map(function(el) {
				newArr.push(el.Pricing[1] * 0.01);
			});
			this.setState({
				pricing: newArr,
				time: 'per month'
			});
		} else if (e.target.value === 'annually') {
			this.state.data.map(function(el) {
				newArr.push(el.Pricing[12] * 0.01);
			});
			this.setState({
				pricing: newArr,
				time: 'per year'
			});
		} else if (e.target.value === 'twoyears') {
			this.state.data.map(function(el) {
				newArr.push(el.Pricing[24] * 0.01);
			});
			this.setState({
				pricing: newArr,
				time: 'for two years'
			});
		}
	};

	// Function onChange handler for select by category "currency"
	onCurrencyChange = (e) => {
		if (e.target.value === 'eur') {
			this.setState({
				currency: '\u20AC'
			});
		} else if (e.target.value === 'chf') {
			this.setState({
				currency: 'CHF'
			});
		} else if (e.target.value === 'usd') {
			this.setState({
				currency: '\u0024'
			});
		}
	};

	render() {
		console.log(this.props.result); // this is the fetched data (result)
		console.log(this.data); // copied fetched data
		console.log(this.state.data); // 3 objects for "plus", "professional", "visionary"
		console.log(this.state.pricing); 

		return (
			<Container>
				<Head>
					<title>Protonmail-test</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>
				<main>
					<Container className={styles.listContainer}>
						<Header onPeriodChange={this.onPeriodChange} onCurrencyChange={this.onCurrencyChange} />
						<Row className={styles.cardsRow}>
							<Card
								name="FREE"
								currency={this.state.currency}
								monthly="0"
								pricing="0"
								title={this.state.text0}
								user="1"
								storage={this.state.storage0}
								addresses="1"
								domains="no"
								vpn={this.state.vpn0}
							/>

							{this.state.data.map((el, i) => (
								<Card
									extra="MOST POPULAR"
									key={i}
									name={el.Name.toUpperCase()}
									user={el.MaxMembers}
									addresses={el.MaxAddresses}
									domains={el.MaxDomains}
									currency={this.state.currency}
									monthly={(i == 0 && 5) || (i == 1 && 8) || (i == 2 && 30)}
									pricing={
										(i == 0 && this.state.pricing[0]) ||
										(i == 1 && this.state.pricing[1]) ||
										(i == 2 && this.state.pricing[2])
									}
									time={this.state.time}
									title={
										(i == 0 && this.state.text1) ||
										(i == 1 && this.state.text2) ||
										(i == 2 && this.state.text3)
									}
									vpn={
										(i == 0 && this.state.vpn1) ||
										(i == 1 && this.state.vpn2) ||
										(i == 2 && this.state.vpn3)
									}
									storage={
										(i == 0 && this.state.storage1) ||
										(i == 1 && this.state.storage2) ||
										(i == 2 && this.state.storage3)
									}
								>
									{i == 0 && <span className={styles.mostPopular}>MOST POPULAR</span>}
									{
										<p className={styles.parag}>
											<span className={styles.iconArrow}>
												<i className="fas fa-arrow-right" />
											</span>{' '}
											{(i == 0 && this.state.additional1) ||
												(i == 1 && this.state.additional2) ||
												(i == 2 && this.state.additional3)}{' '}
										</p>
									}
									{i == 2 && (
										<p className={styles.parag}>
											<span className={styles.iconArrow}>
												<i className="fas fa-arrow-right" />
											</span>{' '}
											Priority support  &#8364; &#36;
										</p>
									)}
								</Card>
							))}
						</Row>
					</Container>
				</main>
			</Container>
		);
	}
}

// Fetching data from API

export async function getStaticProps(currency = 'EUR') {
	const myHeaders = new Headers();

	myHeaders.append('Content-Type', 'application/json;charset=utf-8');
	myHeaders.append('x-pm-appversion', 'Other');
	myHeaders.append('x-pm-apiversion', '3');
	myHeaders.append('Accept', 'application/vnd.protonmail.v1+json');

	const myInit = {
		method: 'GET',
		headers: myHeaders,
		mode: 'cors',
		cache: 'default'
	};

	const response = await fetch(`https://api.protonmail.ch/payments/plans?${currency}`, myInit);
	const result = await response.json();

	// return result.Plans;

	return {
		props: {
			result: result.Plans
		}
	};
}

export default Home;

