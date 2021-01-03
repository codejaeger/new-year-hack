import React, {Component} from 'react'
import axios from '../../axios'


import { withStyles } from '@material-ui/core/styles'

import MenuIcon from '@material-ui/icons/Menu';
import AppleIcon from '@material-ui/icons/Apple';

import {
    Grid,
    Card,
    CardContent,
    Typography,
    CardActions,
    CardActionArea,
    CardMedia,
    Button,
    AppBar,
    Toolbar,
    IconButton
} from '@material-ui/core/'

const styles = theme => ({
    root: {
        flexGrow: 1,
        padding: theme.spacing(2)
    },
    appleButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
})

class Feed extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            content: '',
            description: '',
            publishedAt: new Date(),
            title: '',
            url: '',
            urlToImage: '',
            source: {id: '', name: ''},
            feeds: [],
            items: [],
        };
    }

    getFeedsData = (about) => {
        axios
            .get(`/?about=${about}`, {
                headers: {"Content-Type": "application/json"}
            })
            .then(res => {
                const data = res.data
                console.log(data)

                this.setState({ feeds : res.data.articles });
            })
            .catch((error) => {
                console.log(error)
            })

    }

    updateFeed = (about) => {
        this.getFeedsData(about);
    }

    componentDidMount(){
        this.getFeedsData();
    }


    render() {
        const { feeds } = this.state;
        const { classes } = this.props;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                        News
                        </Typography>
                        <IconButton 
                            edge="start" 
                            className={classes.appleButton} 
                            color="inherit" 
                            aria-label="apple"
                            onClick={() => this.updateFeed("apple")}>
                            <AppleIcon />
                        </IconButton>
                        <Button color="inherit" onClick={() => this.updateFeed("bitcoin")}>BitCoin</Button>
                        <Button color="inherit" onClick={() => this.updateFeed("techcrunch")}>TechCrunch</Button>
                    </Toolbar>
                </AppBar>
                <div style={{marginTop: 30}}>
                    <Grid
                        container
                        spacing={2}
                        direction="row"
                        justify="flex-start"
                        alignItems="flex-start"
                    >
                    {feeds.map(feed => (
                        <Grid item xs={12} sm={6} md={3} key={feeds.indexOf(feed)}>
                            <Card>
                                <CardActionArea>
                                    <CardMedia
                                    style = {{ height: 0, paddingTop: '56%'}}
                                    image={feed.urlToImage}
                                    title={feed.title}
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {feed.title}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                        {feed.description}
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                    Share
                                    </Button>
                                    <Button size="small" color="primary" href={feed.url}>
                                    Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                    </Grid>
                </div>
        </div>
        )
    }
}

export default withStyles(styles)(Feed)