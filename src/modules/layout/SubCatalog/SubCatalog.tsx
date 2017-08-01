import { Flex, Text, View } from "antd-mobile";
import * as React from "react";
import { compose } from "react-apollo";
import { Image, StyleSheet } from "react-native";
import Ripple from "react-native-material-ripple";
import { connect } from "react-redux";
import { Link } from "react-router-native";
import { Dispatch } from "redux";

import { ACTION_ADD_VIEWED_CATEGORY } from "../../catalog/constants";
import { ICatalog } from "../../catalog/model";
import { ICategory } from "../../product/model";
import { ILayout } from "../model";

// const styles = require("./styles.css");

const styles = StyleSheet.create({
  flexItem: {},
  card: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 4,
    borderColor: "#bebfc1",
    borderWidth: 1,
    height: 140,
    margin: 3
  },
  image: {
    width: "60%",
    height: "60%"
  },
  text: {
    fontSize: 16,
    margin: 5
  },
  category: {},
  name: {}
});

interface IConnectedSubCatalogProps {
  navigation: any;
  catalog: ICatalog;
  layout: ILayout;
  dispatch: Dispatch<{}>;
}

interface ISubCatalogProps {
  categories: [ICategory];
  // isDrawer: boolean;
}

function chunk(arr, len = 1) {
  const chunks: any = [];
  let i = 0;
  const n = arr.length;

  while (i < n) {
    chunks.push(arr.slice(i, (i += len)));
  }
  return chunks;
}

class SubCatalog extends React.Component<
  IConnectedSubCatalogProps & ISubCatalogProps,
  any
> {
  onClick = (event, cat) => {
    const { dispatch } = this.props;
    dispatch({ type: ACTION_ADD_VIEWED_CATEGORY, categoryId: cat.id });
    Promise
      .resolve
      // dispatch({ type: ACTION_SET_CATALOG_DRAWER, openCatalog: false })
      ()
      .then(response => {
        // if (!this.isCurrentCategory(cat.id)) {
        //   dispatch(push(`/category/${cat.id}`));
        // }
      });
  };

  // handleClick = (event, id) => {
  //   const { navigate } = this.props.navigation;
  //   navigate("Category", {id: id});
  // };

  isViewed(id) {
    const { catalog, categories } = this.props;
    return catalog.viewedCategoryIds.indexOf(id) !== -1;
  }

  isCurrentCategory = id => {
    // const { router: { location: { pathname } } } = this.props;
    // return pathname.search(`/category/${id}`) !== -1;
  };

  render() {
    const {
      dispatch,
      categories
      // isDrawer
    } = this.props;
    return (
      <View>
        {chunk(categories, 2).map((cats, i) =>
          <Flex justify="center" key={i} wrap="wrap">
            {cats.map((cat, index) =>
              <Flex.Item key={`cat${index}`}>
                <Link to={`/category/${cat.id}`}>
                  <View style={styles.card} justify="center">
                    <Image
                      resizeMode="contain"
                      style={styles.image}
                      source={{ uri: cat.image.src }}
                    />
                    <Text style={styles.text}>
                      {cat.name}
                    </Text>
                  </View>
                </Link>
              </Flex.Item>
            )}
          </Flex>
        )}
      </View>
    );
  }
}

const mapStateToProps: any = state => ({
  catalog: state.catalog,
  layout: state.layout
  // router: state.router
});

export default compose(
  connect<IConnectedSubCatalogProps, {}, ISubCatalogProps>(mapStateToProps)
)(SubCatalog);
