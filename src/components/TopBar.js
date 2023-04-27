import {
  Box,
  Flex,
  Text,
  Image,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  useColorMode
} from '@chakra-ui/react'
import Link from 'next/link'
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  MoonIcon,
  SunIcon
} from '@chakra-ui/icons'
import AvatarMenu from './Avatar/AvatarMenu'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

export default function WithSubnavigation({ asCreator, asCollaborator }) {
  const [navWorkspaces, setNavWorkspaces] = useState([
    {
      label: 'Workspaces',
      children: []
    }
  ])

  useEffect(() => {
    let temp = []
    asCreator.map(item => {
      temp.push({ label: item.name, href: `/w/${item.id}` })
    })
    asCollaborator.map(item => {
      temp.push({ label: item.name, href: `/w/${item.id}` })
    })
    setNavWorkspaces([
      {
        label: 'Workspaces',
        children: temp
      }
    ])
  }, [asCollaborator, asCreator])

  const { isOpen, onToggle } = useDisclosure()
  const { colorMode, toggleColorMode } = useColorMode()
  const { data: session } = useSession()

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'8vh'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            color="cyan.400"
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link href="/">
            <Image
              src="/svg/Planit.png"
              h="auto"
              w="40"
              m="1"
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              alt="Agenda Logo"
            />
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10} mt="4">
            <DesktopNav navWorkspaces={navWorkspaces} />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 1 }}
          justify={'flex-end'}
          direction={'row'}
          alignItems="center"
        >
          <Button onClick={toggleColorMode} bg="transparent">
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Flex>
            <AvatarMenu />
          </Flex>
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav navWorkspaces={navWorkspaces} />
      </Collapse>
    </Box>
  )
}

const DesktopNav = ({ navWorkspaces }) => {
  return (
    <Stack direction={'row'} spacing={4}>
      {navWorkspaces.map(navItem => (
        <NavLink navItem={navItem} key={navItem.label} />
      ))}
      {NAV_TEMPLATES.map(navItem => (
        <NavLink navItem={navItem} key={navItem.label} />
      ))}
    </Stack>
  )
}

const NavLink = ({ navItem }) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Box>
      <Popover trigger={'hover'} placement={'bottom-start'}>
        <PopoverTrigger>
          <Link
            p={2}
            href={navItem.href ?? '#'}
            fontSize={'sm'}
            fontWeight={500}
            color={linkColor}
            _hover={{
              textDecoration: 'none',
              color: linkHoverColor
            }}
          >
            {navItem.label}
          </Link>
        </PopoverTrigger>

        {navItem.children && (
          <PopoverContent
            border={0}
            boxShadow={'xl'}
            bg={popoverContentBgColor}
            p={4}
            rounded={'xl'}
            minW={'sm'}
          >
            <Stack>
              {navItem.children.map(child => (
                <DesktopSubNav key={child.label} {...child} />
              ))}
            </Stack>
          </PopoverContent>
        )}
      </Popover>
    </Box>
  )
}

const DesktopSubNav = ({ label, href }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('cyan.50', 'gray.900') }}
    >
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'cyan.400' }}
            fontWeight={500}
          >
            {label}
          </Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        ></Flex>
      </Stack>
    </Link>
  )
}

const MobileNav = ({ navWorkspaces }) => {
  return (
    <Stack
      bg={useColorModeValue('white', 'gray.800')}
      p={4}
      display={{ md: 'none' }}
    >
      {navWorkspaces.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
      {NAV_TEMPLATES.map(navItem => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Flex
        py={2}
        as={Link}
        href={href ?? '#'}
        justify={'space-between'}
        align={'center'}
        _hover={{
          textDecoration: 'none'
        }}
      >
        <Text
          fontWeight={600}
          color={useColorModeValue('gray.600', 'gray.200')}
        >
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Flex>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}
        >
          {children &&
            children.map(child => (
              <Link key={child.label} py={2} href={child.href}>
                {child.label}
              </Link>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

const NAV_TEMPLATES = [
  {
    label: 'Templates',
    children: [
      {
        label: 'Job Board',
        href: '#'
      },
      {
        label: 'Freelance Projects',
        href: '#'
      }
    ]
  },
  {
    label: 'PersonalDashboard',
    href: '/t'
  }
]
