import type {StructureResolver} from 'sanity/structure'

// https://www.sanity.io/docs/structure-builder-cheat-sheet
export const structure: StructureResolver = (S) =>
    S.list()
.title('Content')
.items([
    S.documentTypeListItem('soundPreset')
        .title("Sound Presets")
        .id('soundPresets'),
    S.documentTypeListItem('page')
        .title('Pages')
        .id('pages'),
    S.documentTypeListItem('recipient')
        .title('Recipients')
        .id('recipients'),
    S.documentTypeListItem('pollQuestion')
        .title('Poll Questions')
        .id('pollQuestions'),
    S.documentTypeListItem('bingoCard')
        .title('Bingo Cards')
        .id('bingoCards'),
    S.listItem()
        .id('memes')
        .title('Memes')
        .child(
            S.list()
            .title('Memes')
            .items([
                S.listItem()
                .id('2024')
                .title('2024')
                .child(
                    S.documentList()
                        .id('2024_list')
                        .schemaType('meme')
                        .title('Spooktober 2024')
                        .filter('_type == "meme" && date > \'2023-11-09\' && date < \'2024-11-02\'')
                ),
                S.listItem()
                .id('2023')
                .title('2023')
                .child(
                    S.documentList()
                        .id('2023_list')
                        .schemaType('meme')
                        .title('Spooktober 2023')
                        .filter('_type == "meme" && date > \'2022-11-02\' && date < \'2023-11-02\'')
                ),
                S.listItem()
                    .id('2022')
                    .title('2022')
                    .child(
                        S.documentList()
                            .id('2022_list')
                            .schemaType('meme')
                            .title('Spooktober 2022')
                            .filter('_type == "meme" && date < \'2022-11-02\'')
                    ),
                S.listItem()
                    .id('All')
                    .title('All')
                    .child(
                        S.documentList()
                            .schemaType('meme')
                            .title('Spooktober 2022')
                            .filter('_type == "meme"')
                    )
            ])
        ),
])
