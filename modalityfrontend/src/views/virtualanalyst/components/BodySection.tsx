import { useEffect } from 'react'
import Loading from '@/components/shared/Loading'
import Categories from './Categories'
import ArticleList from './ArticleList'
import { getCategories, useAppDispatch, useAppSelector } from '../store'

const BodySection = () => {
    const dispatch = useAppDispatch()

    const categories = useAppSelector(
        (state) => state.virtualAnalyst.data.categories,
    )
    const articles = useAppSelector(
        (state) => state.virtualAnalyst.data.articles,
    )
    const loading = useAppSelector((state) => state.virtualAnalyst.data.loading)
    const queryText = useAppSelector(
        (state) => state.virtualAnalyst.data.queryText,
    )
    const isSearchResult = useAppSelector(
        (state) => state.virtualAnalyst.data.isSearchResult,
    )

    useEffect(() => {
        if (categories.length === 0) {
            dispatch(getCategories())
        }
    }, [dispatch, categories.length])

    return (
        <Loading loading={loading}>
            {isSearchResult ? (
                <section className="max-w-[1000px] mx-auto">
                    {articles.length > 0 ? (
                        <>
                            {queryText && (
                                <h4 className="mb-6">
                                    {articles.length} result found for {`'`}
                                    {queryText}
                                    {`'`}
                                </h4>
                            )}
                            <ArticleList data={articles} />
                        </>
                    ) : (
                        <h4 className="text-center">
                            No result found for {`'`}
                            {queryText}
                            {`'`}
                        </h4>
                    )}
                </section>
            ) : (
                <Categories data={categories} />
            )}
        </Loading>
    )
}

export default BodySection
