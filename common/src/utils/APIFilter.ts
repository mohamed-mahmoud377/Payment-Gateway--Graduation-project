import mongoose from "mongoose";

export class APIFilter<T extends mongoose.Document>{
    private _query: mongoose.Query<any,T>;
    private readonly queryString: any; // note that will be the object we get from req.query which is an object
    constructor(query:mongoose.Query<any,T>, queryString:any) {
        this._query = query;
        this.queryString = queryString;
    }


    public filter(){
        const queryObj = {...this.queryString}// fist we are getting a hard copy of it because we are going to change and
        // other functions will need it so

        // we are removing our build in filter fields because if I say
        // ?name=jerry,page=4
        // it does not go in and the database and do this
        // User.find({name="jerry",page=4})
        //which will not return any right results
        const excludedFields = ['page','sort','limit','select'];
        excludedFields.forEach(el=> delete queryObj[el])

        let queryStr = JSON.stringify(queryObj); // we are making the object the hold of the filter as a string

        // when we say ?name=jerry&aga[gte]=23
        // we get in req.query this {name:'jerry' , age: {gte: '23'}}
        // which is good but when want to make a query for greater than in mongo we need to this
        //       User.find({age:{$gte : '32'})          // note that it is okey to put number as strings in mongo
        // so we have to convert the req.query above to match the required rules for mongo
        // and that is exactly what are we doing in the code above
        queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match =>`$${match}`);

        // finding the filter that your wants and save to the query variable so we can use it later and do not lose the query we have got
        this._query = this._query.find(JSON.parse(queryStr));

        // we are doing this so we can so this for example filter().sort().paginate();
        // it would be very cool
        return this ;

    }

    public sort(){
        // checking first if req.query has a sort property
        // why we are doing this ? because this allows us to call it no matter what not caring about the user provided a sort or not
        if (this.queryString.sort){
            // we will provide it like this ?sort=name,price for example but we need it to be like this "name price" for mongo again
            let sortedCriteria  = this.queryString.sort.split(',').join(' ');
            // making the sorting and adding it to the query
            // will be just like this query.sort('name -price'); for example
            this._query = this._query.sort(sortedCriteria);
        }else{
            //getting sort by default by the latest one created
            // this.query = this.query.sort('-createdAt');
        }

        return this;
    }

    limitFields(){
        if (this.queryString.select){
            //extracting the fields and making them ready for mongoDB
            let fields = this.queryString.select.split(',').join(' '); // just like above
            this._query = this._query.select(fields);
        }
        return this;
    }


    paginate(){
        const page = this.queryString.page * 1 || 1; //pages that user provide, *1 is for converting string to integer nice trick, || for when page is actually null so it will take 1 as a default value
        const limit = this.queryString.limit*1 || 100; // this the limit of how many docs this page has
        const skip = (page-1) * limit ; // in mongoose, we say we wanna skip som docs we don't give pages so this is how we get how many docs to skip based on the page and limit

        this._query = this._query.skip(skip).limit(limit);

        return this
    }

    get query(): mongoose.Query<any, T> {
        return this._query;
    }



}