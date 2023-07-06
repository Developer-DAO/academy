import { Box, Text, VStack } from '@chakra-ui/react'
import { Contributor } from '@/components/mdx/Contributor'

interface ContributorFooterProps {
  authors?: string[]
  reviewers?: string[]
  contributors?: string[]
}

export function ContributorFooter({
  authors,
  reviewers,
  contributors,
}: ContributorFooterProps) {
  return (
    <Box
      marginY={12}
      paddingY={4}
      paddingBottom={8}
      borderTopWidth="thin"
      borderColor="gray"
    >
      {authors && Array.isArray(authors) && authors.length > 0 && (
        <Box>
          <Text fontSize={26} marginTop={8} marginBottom={4}>
            {authors.length > 1 ? 'Authors' : 'Author'}
          </Text>
          <VStack spacing={4} alignItems="left">
            {authors.map((contrib) => {
              return <Contributor handle={contrib} avatarSize="2xl" />
            })}
          </VStack>
        </Box>
      )}

      {reviewers && Array.isArray(reviewers) && reviewers.length > 0 && (
        <Box>
          <Text fontSize={20} marginTop={8} marginBottom={4}>
            {reviewers.length > 1 ? 'Reviewers' : 'Reviewer'}
          </Text>
          <VStack spacing={4} alignItems="left">
            {reviewers.map((contrib) => {
              return <Contributor handle={contrib} avatarSize="lg" />
            })}
          </VStack>
        </Box>
      )}

      {contributors &&
        Array.isArray(contributors) &&
        contributors.length > 0 && (
          <Box>
            <Text fontSize={20} marginTop={8} marginBottom={4}>
              {contributors.length > 1
                ? 'Additional Contributors'
                : 'Additional Contributor'}
            </Text>
            <VStack spacing={4} alignItems="left">
              {contributors.map((contrib) => {
                return <Contributor handle={contrib} avatarSize="lg" />
              })}
            </VStack>
          </Box>
        )}
    </Box>
  )
}
